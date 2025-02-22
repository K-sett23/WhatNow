module.exports = function (api) {
    api.cache(true); // Habilita el caching para mejorar el rendimiento
    return {
      presets: ['babel-preset-expo'], // Usa el preset de Expo para Babel
      plugins: [
        'react-native-reanimated/plugin', // Plugin para React Native Reanimated
      ],
    };
  };