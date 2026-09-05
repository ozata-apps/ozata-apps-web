/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  basePath: '/ozata-apps-web',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'prod.spline.design' }],
  },
  trailingSlash: true,
  webpack: (config, { isServer, dev }) => {
    // Enable WebAssembly experiments for @splinetool/runtime
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
      syncWebAssembly: true,
    };

    // Add WASM file extensions
    config.resolve.extensions = [
      ...config.resolve.extensions,
      '.wasm',
    ];

    // Use absolute paths to WASM files - works in both local and CI
    const runtimeBuildPath = path.resolve(__dirname, 'node_modules/@splinetool/runtime/build');
    const publicDracoPath = path.resolve(__dirname, 'public/libs/draco');

    config.resolve.alias = {
      ...config.resolve.alias,
      // Map the WASM imports to actual files using absolute paths
      'boolean_wasm_bg.wasm': path.join(runtimeBuildPath, 'boolean.wasm'),
      'hana-ui_wasm_bg.wasm': path.join(runtimeBuildPath, 'hana-ui.wasm'),
      'navmesh_wasm_bg.wasm': path.join(runtimeBuildPath, 'navmesh.wasm'),
      'physics_wasm_bg.wasm': path.join(runtimeBuildPath, 'physics.wasm'),
      'process_wasm_bg.wasm': path.join(runtimeBuildPath, 'process.wasm'),
      // Map draco imports
      '../libs/draco/draco_decoder.wasm': path.join(publicDracoPath, 'draco_decoder.wasm'),
      '../libs/draco/draco_wasm_wrapper.js': path.join(publicDracoPath, 'draco_wasm_wrapper.js'),
      '../libs/draco/draco_decoder.js': path.join(publicDracoPath, 'draco_decoder.js'),
      '../libs/draco/gltf/draco_wasm_wrapper.js': path.join(publicDracoPath, 'gltf/draco_wasm_wrapper.js'),
      '../libs/draco/gltf/draco_decoder.wasm': path.join(publicDracoPath, 'gltf/draco_decoder.wasm'),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
};
module.exports = nextConfig;