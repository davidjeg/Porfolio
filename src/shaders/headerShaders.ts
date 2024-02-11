export const vertexShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main(){
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition,1.0);

    }`;

export const fragmentShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    precision highp float;
    void main(){
      vec2 uv = vUv;
      uv -= 0.5;
      float sineWave = .2 * sin(uTime) ;
      float d = length(uv);
      float c = smoothstep(.4, .38, d);
      float inside = smoothstep(.39,abs(.2*sineWave+.32),d);
      c -= inside;
      vec3 color = vec3(1.,.4,.2);
      color *= c;

      gl_FragColor = vec4(color, 1.0);

    }
    `;
