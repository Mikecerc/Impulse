import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("pause").setDescription("pauses the current track").setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({ content: "You must be in a voice channel to use this command" });
        }
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            subscription.audioPlayer.pause();
            await interaction.followUp({ content: `Paused!`, ephemeral: true });
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};
