ls &&
mongoimport -d albumlist-musicplayer -c artists --jsonArray --file ./data/seed_data.json && 
mongoimport -d albumlist-musicplayer -c artists --jsonArray --file ./data/seed_data1.json &&
mongoimport -d albumlist-musicplayer -c artists --jsonArray --file ./data/seed_data2.json &&
mongoimport -d albumlist-musicplayer -c artists --jsonArray --file ./data/seed_data3.json
