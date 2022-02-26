const admin = require('firebase-admin');
const firestore = admin.firestore();

async function checkBan(guildId) {
	try {
		const querySnapshot = await fetchBanDocument(guildId);

		if (querySnapshot.empty) return;

		await batchDelete(querySnapshot);

		process.nextTick(() => {
			checkBan(guildId);
		});
	}
	catch (error) {
		console.error(error);
	}
}

function fetchBanDocument(guildId) {
	const now = Date.now();
	return firestore
		.collection(`guildDataBase:${guildId}`)
		.doc('banList')
		.collection('bannedPlayerList')
		.where('banDetails.bannedUntil', '<=', now)
		.limit(500)
		.get();
}

async function batchDelete(snapshot) {
	const batch = firestore.batch();
	snapshot.forEach(doc => {
		console.log(`Deleted ${doc.id}.`);
		batch.delete(doc.ref);
	});
	await batch.commit();
}

module.exports = async function runAutoUnban(clientGuildsMap) {
	console.log('Checking for player(s) to unban!');
	for (const clientGuildsMapValue of clientGuildsMap) {
		const guildObject = clientGuildsMapValue[1];
		await checkBan(guildObject);
	}
	console.log('Checking complete!');
};