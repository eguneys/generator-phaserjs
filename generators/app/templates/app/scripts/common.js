require.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app',
        states: '../app/states',
        almond: 'almond/almond',
        'phaser': 'phaser-official/build/phaser',
        requirejs: 'requirejs/require'
    },
    shim: {
        phaser: {
            exports: 'Phaser'
        }
    }
});
