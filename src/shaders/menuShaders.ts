export const vertexShader = `

varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;


float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main(){
    vUv = uv;
    vPosition = position;


    float amplitude = .4; // Aumenta la amplitud
    float frequency = .09;
    float myNoise = noise(vPosition.xy * frequency+uTime*.2);
    vPosition += amplitude * myNoise;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition,1.);
}
`;

export const fragmentShader = `


varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;


void main(){
    vec2 uv = vUv;
    vec3 color = uColor; 

    gl_FragColor = vec4(color, 1.0);
}

`;
