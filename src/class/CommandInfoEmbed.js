const { MessageEmbed } = require('discord.js');

module.exports = class EmbededCommandInfoMessage extends MessageEmbed {
	constructor(command, commnandName, prefix) {
		super();
		this.setColor('#EFFF00');
		this.setTitle('Command Information');
		this.addFields({
			name: 'Command Name:',
			value: `${command.name}`,
		}, {
			name: 'Command Desc:',
			value: `${command.desc}`,
			inline: true,
		}, {
			name: 'Command Usage:',
			value: `${prefix}${commnandName} ${command.usage}`,
		}, {
			name: 'Command Example:',
			value: command.example ? `${prefix}${command.example}` : 'No example',
			inline: true,
		}, {
			name: 'Command Aliases:',
			value: command.aliases ? command.aliases.join(', ') : 'No aliases',
		}, {
			name: 'Command Aliases:',
			value: command.cooldown,
		}, {
			name: 'Owner Only:',
			value: command.ownerOnly ? true : false,
		}, {
			name: 'Require Permission:',
			value: command.permission ? true : false,
		});
	}
};