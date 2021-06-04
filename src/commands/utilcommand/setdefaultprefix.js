const DataBaseRelatedCommandClass = require('@util/DataBaseRelatedCommandClass');

module.exports = class SetPrefixCommand extends DataBaseRelatedCommandClass {
	constructor(botClient) {
		super(
			botClient,
			'setdefaultprefix',
			'Set the default prefix. Use this command wisely.',
			'<desiredDefaultPrefix>',
			{
				aliases: ['sdf', 'defaultprefix', 'df'],
				example: 'setdefaultprefix ε',
				cooldown: 5,
				args: true,
				guildonly: true,
				reqarglength: 1,
				guildOwnerOnly: true,
			});
	}
	async execute(message, args) {
		const { guildConfig, guildId } = message.guild;
		const [desiredDefaultPrefix] = args;

		try {
			await this.dataBase
				.collection(`guildDataBase:${guildId}`)
				.doc('guildConfigurations')
				.update({
					'guildConfig.defaultPrefix': desiredDefaultPrefix,
				});
		}
		catch (error) {
			console.error(error);
			return message.reply(`There was an error while adding the role!\n${error}`);
		}

		guildConfig.set('defaultPrefix', desiredDefaultPrefix);
		return message.channel.send(`The defaultPrefix has been set to ${desiredDefaultPrefix}.`);
	}
};