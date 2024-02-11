import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { FaReact, FaHtml5, FaCss3, FaNodeJs } from 'react-icons/fa';
import { BiLogoBlender } from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';
import { SiThreedotjs, SiTypescript } from 'react-icons/si';

interface Props {
    visible: boolean;
}

export const About = ({ visible }: Props) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const loader = new GLTFLoader();
        const light = new THREE.AmbientLight();
        const canvasW = canvasRef.current?.clientWidth;
        const canvasH = canvasRef.current?.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            canvasW / canvasH,
            2,
            100
        );
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xfe9dd0, 1);
        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(canvasW, canvasH),
            0.1,
            0.5,
            1
        );

        const outputPass = new OutputPass();

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(outputPass);
        renderer.pixelRatio = window.devicePixelRatio;
        renderer.autoClear = true;

        scene.add(camera);
        scene.add(light);
        renderer.setSize(canvasW, canvasH);
        loader.load('character.glb', (gltf) => {
            gltf.scene.position.y = -10;
            scene.add(gltf.scene);
        });

        canvasRef.current && canvasRef.current.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
        const delta = new THREE.Clock();
        const animate = () => {
            const elapsedTime = delta.getElapsedTime();
            // Ejemplo de animación de la posición de la cámara
            camera.position.x = Math.sin(elapsedTime * 0.2) * 40; // Modifica según tus necesidades
            camera.position.z = Math.cos(elapsedTime * 0.2) * 40; // Modifica según tus necesidades

            // Actualiza la orientación de la cámara si es necesario
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
            controls.update();
            composer.render();
        };

        animate();

        window.addEventListener('resize', () => {});

        renderer.render(scene, camera);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, transition: { duration: 1 }, y: 0 }}
            exit={{ opacity: 0, y: -200, transition: { duration: 1 } }}
            className='font-manjari flex flex-col h-full gap-8 items-center justify-center'>
            <div className=' '>
                <h3 className='text-2xl'>About Me</h3>

                <div className='flex h-full items-center gap-16'>
                    <div className='flex justify-center flex-col items-center gap-4'>
                        <div className='w-64 h-64 rounded-xl overflow-hidden flex-0'>
                            <div
                                ref={canvasRef}
                                className='w-full h-full'></div>
                        </div>

                        <p className='flex-1 text-justify w-full max-w-xl'>
                            I am a passionate Full Stack programmer with
                            diversified skills that go beyond web application
                            development. My experience ranges from the creation
                            of complete solutions in the field of programming to
                            the construction of 3D models and the foray into
                            user interface design (UI/UX) and video game
                            programming.
                        </p>
                    </div>
                    <div className='flex-0 grid grid-cols-3 gap-8'>
                        <FaReact size='32' />
                        <FaHtml5 size='32' />
                        <FaCss3 size='32' />
                        <FaNodeJs size='32' />
                        <SiThreedotjs size='32' />
                        <BiLogoBlender size='32' />
                        <SiTypescript size='32' />
                        <DiGithubBadge size='32' />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
