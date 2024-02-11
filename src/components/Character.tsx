import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

export const Character = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.pixelRatio = window.devicePixelRatio;
        renderer.setClearColor(0x09090b, 0);
        const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const light = new THREE.PointLight(0xffffff, 5000, 1000);
        light.castShadow = true;
        const pointLightHelper = new THREE.PointLightHelper(light, 1);
        const canvasW = canvasRef.current?.clientWidth;
        const canvasH = canvasRef.current?.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            50,
            canvasW / canvasH,
            0.1,
            1000
        );

        const geometry = new THREE.BufferGeometry();

        const nVertices = 300;
        const vertices = new Float32Array(nVertices);
        for (let i = 0; i < nVertices; i += 3) {
            vertices[i] = (Math.random() - 0.5) * 200;
            vertices[i + 1] = (Math.random() - 0.5) * 300;
            vertices[i + 2] = (Math.random() - 0.5) * 300;
        }

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(vertices, 3)
        );
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.3,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.set(-120, 20, -150);
        light.position.set(-40, 10, -20);

        renderer.setSize(canvasW, canvasH);
        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(canvasW, canvasH),
            0.05,
            0.5,
            1
        );
        // const controls = new OrbitControls(camera, renderer.domElement);

        const outputPass = new OutputPass();

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(outputPass);
        renderer.autoClear = false;
        renderer.shadowMap.enabled = true;
        scene.add(camera);
        scene.add(light);
        scene.add(pointLightHelper);
        let pointCamera: THREE.Vector3;

        var animationMixer: THREE.AnimationMixer;
        // LOADER
        loader.load('./character.glb', (model) => {
            model.scene.position.set(0, -55, 0);
            scene.add(model.scene);
            animationMixer = new THREE.AnimationMixer(model.scene);
            model.animations.forEach((animation) => {
                animationMixer.clipAction(animation).play();
            });
            var firstAnim = animationMixer.clipAction(model.animations[0]);
            var secondAnim = animationMixer.clipAction(model.animations[1]);
            firstAnim.play();
            secondAnim.play();
            model.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    if (child.name === 'Cube') {
                        child.receiveShadow = true;
                        pointCamera = child.position.clone();
                    }
                    if (child.name === 'Sphere') {
                        child.castShadow = false;
                    } else {
                        child.castShadow = true;
                    }
                }
            });
        });

        canvasRef.current && canvasRef.current.appendChild(renderer.domElement);

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const deltaTime = clock.getElapsedTime();
            if (pointCamera) {
                camera.position.x = 200 * Math.cos(deltaTime * 0.1);
                camera.position.z = 200 * Math.sin(deltaTime * 0.1);

                camera.lookAt(pointCamera);
            }
            if (animationMixer) {
                animationMixer.update(0.02);
            }

            composer.render();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {};

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div
            ref={canvasRef}
            className='absolute bottom-6 left-1/2 -translate-x-1/2   w-full h-full'></div>
    );
};
