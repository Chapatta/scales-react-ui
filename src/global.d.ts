// src/global.d.ts
// The global.d.ts file is a TypeScript declaration file that allows you to define global types and variables 
// that are available throughout your TypeScript project. 
// When TypeScript compiles your project, it automatically includes any .d.ts files found in your project's source directories.
declare let process: {
    env: {
      NODE_ENV: 'development' | 'production' | 'staging' | 'test';
      [key: string]: string | undefined;
    };
  };

  // src/config/index.ts

