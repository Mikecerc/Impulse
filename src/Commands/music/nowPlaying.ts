import { AudioPlayerStatus } from "@discordjs/voice";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("np").setDescription("Lists info on the song currently playing").setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            let embed = new EmbedBuilder().setColor("Orange");
            if (subscription.audioPlayer.state.status === AudioPlayerStatus.Idle) {
                embed.setTitle(`Nothing is currently playing!`);
            } else {
                /**const currentPlaybackSeconds =
                    subscription.audioPlayer.state.resource.playbackDuration /
                    1000;
                const currentPlayback =
                    Math.floor(currentPlaybackSeconds % 60) < 10
                        ? `${Math.floor(
                              currentPlaybackSeconds / 60
                          )}:0${Math.floor(currentPlaybackSeconds % 60)}`
                        : `${Math.floor(
                              currentPlaybackSeconds / 60
                          )}:${Math.floor(currentPlaybackSeconds % 60)}`; */
                //let date = new Date(0);
                //date.setSeconds(subscription.audioPlayer.state.resource.playbackDuration / 1000)
                //const currentPlayback = date.toISOString().slice(11, 19);
                const currentPlayback = hms((subscription.audioPlayer.state.resource.playbackDuration / 1000).toString());
                const durationString = `${currentPlayback} / ${subscription.audioPlayer.state.resource.metadata.duration.timestamp ? subscription.audioPlayer.state.resource.metadata.duration.timestamp : subscription.audioPlayer.state.resource.metadata.duration }`;
                embed
                    .setAuthor({ name: "Now Playing" })
                    .setTitle(`${subscription.audioPlayer.state.resource.metadata.title}`)
                    .setURL(subscription.audioPlayer.state.resource.metadata.url)
                    .setThumbnail(subscription.audioPlayer.state.resource.metadata.thumbnail)
                    .setFooter(subscription.audioPlayer.state.resource.metadata.requestedBy)
                    .addFields({ name: "Duration:", value: durationString });
            }
            await interaction.followUp({ embeds: [embed] });
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};

function hms(num: string) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}
