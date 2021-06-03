const DataBaseRelatedCommandClass = require('@util/DataBaseRelatedCommandClass');

module.exports = class UnbanCommand extends DataBaseRelatedCommandClass {
	constructor(botClient) {
		super(
			botClient,
			'unban',
			'remove the player from the database assuming the player is in the database',
			'playerName', {
				aliases: ['ub', 'forgive', 'amnesty', 'remove'],
				example: 'unban joemama',
				args: true,
				cooldown: 5,
				permission: true,
				guildonly: true,
			});
	}
	async execute(msg, args) {
		const [playerName] = args;
		try {
			const playerId = await this.getUserId(playerName);
			this.deletePlayerBanDocument(playerId);
		}
		catch (error) {
			console.error(error);
			return msg.channel.send(`There was an error while removing ${playerName}!\n${error}`);
		}
		return msg.channel.send(`Player: ${playerName}, removed from Firebase Firestore.`);
	}
};