import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Skills } from './Skills';
import * as THREE from 'three';

export const AboutMe = () => {
    const characterRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const w = characterRef.current && characterRef.current.clientWidth;
        const h = characterRef.current && characterRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
        const light = new THREE.AmbientLight(0xffffff);
        camera.position.set(0, 0, 20);
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x09090b, 0);
        renderer.render(scene, camera);
        scene.add(camera);
        scene.add(light);
        const loader = new GLTFLoader();
        const controls = new OrbitControls(camera, renderer.domElement);

        let mixer: THREE.AnimationMixer;
        loader.load('./aboutme.glb', (model) => {
            model.scene.position.set(0, -12, 0);
            scene.add(model.scene);

            mixer = new THREE.AnimationMixer(model.scene);
            model.animations.forEach((anim) => {
                mixer.clipAction(anim).play();
            });
            const firstAnim = mixer.clipAction(model.animations[1]);
            firstAnim.play();
        });
        renderer.setSize(w, h);
        characterRef.current &&
            characterRef.current.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            if (mixer) {
                mixer.update(0.02);
            }
        };

        animate();
    }, []);
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                className='flex gap-8 items-center '>
                <motion.div className='flex-1 rounded-lg   h-64'>
                    <div className='w-full h-full ' ref={characterRef}></div>
                </motion.div>
                <div className='flex-1 py-8 flex flex-col gap-8'>
                    <motion.div>
                        <h2 className='text-2xl'>About me</h2>
                        <p className=''>
                            I am a passionate Full Stack programmer with
                            diversified skills that go beyond web application
                            development. My experience ranges from the creation
                            of complete solutions in the field of programming to
                            the construction of 3D models and the foray into
                            user interface design (UI/UX) and video game
                            programming.
                        </p>
                    </motion.div>
                    <motion.div className='flex flex-col gap-4'>
                        <h3 className='text-xl font-semibold'>Skills</h3>
                        <Skills />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
