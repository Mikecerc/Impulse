export default {
    name: 'ready',
    execute(client) {
        console.log('The client is ready :)');
        client.user.setActivity('Shane Hurley', { type: 'WATCHING' });
    },
};