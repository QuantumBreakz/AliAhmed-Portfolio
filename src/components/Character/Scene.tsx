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
import fallbackImg from "../../assets/react.svg"; // Use a static image as fallback for mobile

const LOADING_TIMEOUT = 20000; // 20 seconds

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Retry handler
  const handleRetry = useCallback(() => {
    setLoadError(null);
    setLoadingPercent(0);
    setIsLoading(true);
    setRetryCount((c) => c + 1);
  }, []);

  useEffect(() => {
    // Mobile detection
    const mobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
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
      antialias: !mobile,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(mobile ? 1 : window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    // WebGL support check
    if (!renderer.capabilities.isWebGL2) {
      setLoadError("WebGL2 is not supported on this device/browser.");
      setLoading(100);
      setIsLoading(false);
      return;
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

    // Only load 3D character on all devices, with error handling
    (async () => {
      try {
        // Patch setCharacter to accept onProgress
        const gltf = await loadCharacter(onProgress);
        if (gltf) {
          clearTimeout(loadingTimeout);
          setLoadingPercent(100);
          setLoading(100);
          setIsLoading(false);
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
          if (scene.environment && scene.environment instanceof THREE.Texture) {
            envMap = scene.environment;
          }
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", onResize);
        } else {
          clearTimeout(loadingTimeout);
          setLoadError("3D model could not be loaded. Try again or use a different device.");
          setLoading(100);
          setIsLoading(false);
        }
      } catch (err) {
        clearTimeout(loadingTimeout);
        setChar(null);
        setLoadError("3D model failed to load. Please try again or use a different device.");
        setLoading(100);
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error("Failed to load 3D character:", err);
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
      if (debounce) clearTimeout(debounce);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (animationCleanup) animationCleanup();
      clearTimeout(loadingTimeout);
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
        mixer.uncacheRoot(gltfScene as any);
      }
      if (envMap) {
        envMap.dispose();
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement) {
          const gl = renderer.getContext();
          if (gl && gl.getExtension) {
            const loseContext = gl.getExtension("WEBGL_lose_context");
            if (loseContext) loseContext.loseContext();
          }
        }
      }
      scene.clear();
    };
  }, [retryCount]);

  // Show error/fallback if loading failed
  if (loadError) {
    return (
      <div className="character-container" style={{ textAlign: "center", padding: 32 }}>
        <div style={{ color: "#c2a4ff", marginTop: 16, fontSize: 18 }}>{loadError}</div>
        <button style={{ marginTop: 24, padding: '8px 24px', fontSize: 16, background: '#c2a4ff', color: '#0b080c', border: 'none', borderRadius: 8, cursor: 'pointer' }} onClick={handleRetry}>Retry</button>
        <div style={{ marginTop: 32 }}>
          <img src={fallbackImg} alt="3D character fallback" style={{ width: 120, height: 120, opacity: 0.7 }} />
        </div>
      </div>
    );
  }

  // Show loading spinner and progress
  if (isLoading) {
    return (
      <div className="character-container" style={{ textAlign: "center", padding: 32 }}>
        <div className="spinner" style={{ margin: '40px auto', width: 48, height: 48, border: '6px solid #c2a4ff', borderTop: '6px solid #0b080c', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <div style={{ color: "#c2a4ff", marginTop: 16, fontSize: 18 }}>Loading 3D Model... {loadingPercent}%</div>
        {isMobile && <div style={{ color: '#fff', marginTop: 8, fontSize: 14 }}>Loading may take longer on mobile devices.</div>}
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
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
