import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const LOADING_TIMEOUT = 20000; // 20 seconds

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slowLoading, setSlowLoading] = useState(false);

  // Retry handler
  const handleRetry = useCallback(() => {
    setLoadError(null);
    setLoadingPercent(0);
    setIsLoading(true);
    setRetryCount((c) => c + 1);
    setSlowLoading(false);
  }, []);

  useEffect(() => {
    // Check WebGL support first
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.warn('WebGL not supported, falling back to static content');
          setWebglSupported(false);
          setLoading(100); // Complete loading immediately
          setIsLoading(false);
          return false;
        }
        return true;
      } catch (e) {
        console.warn('WebGL check failed:', e);
        setWebglSupported(false);
        setLoading(100);
        setIsLoading(false);
        return false;
      }
    };

    if (!checkWebGLSupport()) {
      return; // Exit early if WebGL not supported
    }

    // Mobile detection
    const mobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    
    if (!canvasDiv.current) {
      setLoading(100);
      setIsLoading(false);
      return;
    }
    
    let rect = canvasDiv.current.getBoundingClientRect();
    let container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    // Lower pixel ratio for mobile
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobile, // disable antialias on mobile for perf
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(mobile ? 1 : window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    // WebGL support check
    const gl = renderer.getContext();
    const isWebGL2 = !!gl && typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    if (!isWebGL2) {
      // Try to fallback to WebGL1
      if (!gl || !(gl instanceof WebGLRenderingContext)) {
        setLoadError("3D rendering is not supported on this device/browser. Please use a modern browser with WebGL support.");
        setLoading(100);
        setIsLoading(false);
        return;
      } else {
        // Warn but proceed with WebGL1
        console.warn("WebGL2 not supported, falling back to WebGL1. Some features may be limited.");
      }
    }

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | undefined;
    let gltfScene: THREE.Object3D | undefined;
    let animationCleanup: (() => void) | undefined;
    let envMap: THREE.Texture | undefined;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    let progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = mobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    // Throttled event handler
    let lastMouseMove = 0;
    const onMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMove > 16) {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
        lastMouseMove = now;
      }
    };
    let debounce: NodeJS.Timeout | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", onTouchMove, { passive: true });
      }, 200);
    };
    const onTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastMouseMove > 16) {
        handleTouchMove(e, (x, y) => (mouse = { x, y }));
        lastMouseMove = now;
      }
    };
    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    // Show a slow loading warning after 10 seconds
    const slowLoadingTimeout = setTimeout(() => {
      setSlowLoading(true);
    }, 10000);

    // Loading timeout fallback
    const loadingTimeout = setTimeout(() => {
      setLoadError("3D model failed to load in time. Please try again or use a different device.");
      setLoading(100);
      setIsLoading(false);
    }, LOADING_TIMEOUT);

    // Real progress update using GLTFLoader
    let lastProgress = 0;
    const onProgress = (xhr: ProgressEvent<EventTarget>) => {
      if (xhr.lengthComputable) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        if (percent > lastProgress) {
          setLoadingPercent(percent);
          setLoading(percent);
          lastProgress = percent;
        }
      }
    };

    // Wait for environment map
    let envMapLoaded = false;

    // Load 3D character on all devices that support WebGL
    (async () => {
      try {
        const gltf = await loadCharacter();
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animationCleanup = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          let character = gltf.scene;
          gltfScene = character;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          // Try to get environment map for later disposal
          if (scene.environment && scene.environment instanceof THREE.Texture) {
            envMap = scene.environment;
          }
          
          // Clear timeouts on successful load
          clearTimeout(slowLoadingTimeout);
          clearTimeout(loadingTimeout);
          setSlowLoading(false);
          
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
              setIsLoading(false);
            }, 2500);
          });
          window.addEventListener("resize", onResize);
        }
      } catch (err) {
        // Handle loading errors gracefully
        setChar(null);
        console.error("Failed to load 3D character:", err);
        setLoadError("Failed to load 3D character. Please try refreshing the page.");
        // Complete loading even if 3D fails
        setLoading(100);
        setIsLoading(false);
        clearTimeout(slowLoadingTimeout);
        clearTimeout(loadingTimeout);
      }
    })();

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    // Animation loop (throttled for mobile)
    const animate = (now?: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (mobile && now !== undefined) {
        if (now - lastFrameTime < frameInterval) return;
        lastFrameTime = now;
      }
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    // Event listeners
    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    function onResize() {
      handleResize(renderer, camera, canvasDiv, character!);
    }

    // Cleanup function
    return () => {
      clearTimeout(slowLoadingTimeout);
      clearTimeout(loadingTimeout);
      if (debounce) clearTimeout(debounce);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (animationCleanup) animationCleanup();
      // Remove event listeners
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
        landingDiv.removeEventListener("touchmove", onTouchMove);
      }
      // Remove renderer DOM
      if (canvasDiv.current && renderer.domElement.parentNode === canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
      // Dispose Three.js objects
      if (gltfScene) {
        gltfScene.traverse((child: any) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((m: any) => m.dispose && m.dispose());
              } else {
                child.material.dispose && child.material.dispose();
              }
            }
            if (child.material && child.material.map) {
              child.material.map.dispose && child.material.map.dispose();
            }
          }
        });
      }
      if (mixer) {
        // Dispose animation mixer
        // (no explicit dispose, but remove all actions)
        mixer.uncacheRoot(gltfScene as any);
      }
      if (envMap) {
        envMap.dispose();
      }
      if (renderer) {
        renderer.dispose();
        // Also try to force context loss for mobile GPU leaks
        if (renderer.domElement) {
          const gl = renderer.getContext();
          if (gl && gl.getExtension) {
            const loseContext = gl.getExtension("WEBGL_lose_context");
            if (loseContext) loseContext.loseContext();
          }
        }
      }
      // Remove all children from scene
      scene.clear();
    };
  }, [retryCount]);

  // If WebGL is not supported, show a fallback message
  if (!webglSupported) {
    return (
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'var(--accentColor)',
            fontSize: '16px',
            zIndex: 10
          }}>
            <div>3D Character</div>
            <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
              WebGL not supported on this device
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (loadError) {
    return (
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'var(--accentColor)',
            fontSize: '14px',
            zIndex: 10,
            maxWidth: '300px'
          }}>
            <div style={{ marginBottom: '10px' }}>3D Character</div>
            <div style={{ fontSize: '12px', marginBottom: '15px', opacity: 0.8 }}>
              {loadError}
            </div>
            <button 
              onClick={handleRetry}
              style={{
                background: 'var(--accentColor)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'var(--accentColor)',
            fontSize: '14px',
            zIndex: 10
          }}>
            <div style={{ marginBottom: '10px' }}>Loading 3D Character</div>
            <div style={{ fontSize: '12px', marginBottom: '5px' }}>
              {loadingPercent}%
            </div>
            {slowLoading && (
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '5px' }}>
                This is taking longer than usual...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
