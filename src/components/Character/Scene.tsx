import { useEffect, useRef, useState } from "react";
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

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Mobile detection
    const mobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
    if (!canvasDiv.current) {
      setLoading(100); // Defensive: finish loading if no canvas
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
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(mobile ? 1 : window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

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
      if (now - lastMouseMove > 16) { // ~60fps
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

    // Only load 3D character on non-mobile
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
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", onResize);
        }
      } catch (err) {
        // Optionally show error UI
        setChar(null);
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
  }, []);

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
