let fragmentShader = /*glsl*/ `

void main() {
    // Simple color for the distorted icosphere based on normals
    gl_FragColor = vec4(0.0, 0.0, 0.0, .2); // Normal mapping
}`;

export default fragmentShader;
