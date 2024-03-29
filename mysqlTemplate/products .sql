CREATE TABLE products ( -- 商品資料表
 product_id INT AUTO_INCREMENT PRIMARY KEY, -- 商品編號
 product_name VARCHAR(255) NOT NULL UNIQUE, -- 商品名稱
 product_type VARCHAR(20) NOT NULL, -- 商品類型
 image VARCHAR(255),  -- 商品封面圖
 description TEXT,  -- 商品介紹
 price INT UNSIGNED NOT NULL,  -- 商品價格
 age_rating VARCHAR(10) NOT NULL, -- 年齡分級
 developer VARCHAR(25), -- 開發商
 publisher VARCHAR(25), -- 發行商
 buy_count INT UNSIGNED,  -- 購買次數(判斷熱門依據)
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 請務必將以下的商品添加進 products 資料表！！(複製貼上即可)
INSERT INTO products (product_name, product_type, image, description, price, age_rating, developer, publisher, buy_count)
VALUES ('俠盜獵車手5', '動作', 'action/GTA5.jpg', '遊戲設定在 2013年 左右的洛聖都及其周邊地區，講述了三個主角麥可．迪聖塔、富蘭克林．柯林頓和崔佛．菲利普的故事。故事發生在《俠盜獵車手4》故事線後約五年。主要是一款開放世界的動作冒險遊戲，玩家扮演不同角色自由探索、任務、駕駛車輛、玩家對戰等。', 1300, '18', 'Rockstar', 'Rockstar', 25021),
       ('碧血狂殺2', '動作', 'action/Red_Dead_Redemption_1.jpg', '《碧血狂殺2》是一款開放世界的西部動作遊戲，玩家扮演亞瑟摩根，在西部探索、狩獵、戰鬥的冒險旅程。他故事舞台和時間是在美國舊西部時代末期，這個時期對美國來說是一個轉捩點，政府對於西部的各種非法情事開始正式整肅，以往各種黑幫匪類為非作歹的地下勾當，也紛紛被政府秋後算帳。', 1300, '18', 'Rockstar', 'Rockstar', 6032),
       ('最後生還者2', '動作', 'action/The_last_of_us_2.jpg', '《最後生還者2》是2020年一款由頑皮狗開發的恐怖動作遊戲，劇情以某種會讓人們失去自我意識、化為凶暴感染者的變種蟲草真菌在全球蔓延，導致人類文明全面瓦解崩壞的背景世界觀為基礎，講述在前作《最後生還者》結局喬爾帶著艾莉逃離「火螢」組織的 5 年後，如今已長大成人的艾莉跟歷盡滄桑的喬爾，為了維護她所堅持的正義並尋求終結，再度踏上一場殘酷的冒險旅程。', 1300, '12', 'Naughty Dog', 'Sony', 5125),
       ('惡靈勢力2', '動作', 'action/l4d2_1.png', '與舊作《惡靈勢力》一樣，玩家要和其他倖存者角色（共四人）一起合作，逃離被病毒感染的區域並對抗沿路上的感染者與特殊感染者。玩家要根據沿途所看到的指示逃到下一個安全室，到達指定地點後便要抵抗不斷來襲的感染者與特殊感染者，直到救援的來臨以離開疫區。在逃亡的路上，玩家需要啟動地圖上的一些機關，好讓倖存者能夠繼續前進，但此舉更會引起大量感染者的來襲!', 400, '12', 'Valve', 'Valve', 7812),
       ('極地戰嚎5', '動作', 'action/FarCry5.jpg', '《極地戰嚎5》是一款開放世界的第一人稱動作遊戲，玩家需要與異教勢力作戰，並自由探索世界、狩獵、駕駛車輛。故事背景主要是以美國蒙大拿州當中一個名為希望郡的小鎮，受到末日教派的邪教團體紮根影響，下至人民日常生活用品製造、上至警方與政府單位，都已受其黨羽深度滲透，玩家扮演的則是一個小小的警察，隻身一人四處培植反抗勢力，以期有朝一日能絕地反攻的各種日常生活。', 1000, '18', 'Ubisoft', 'Ubisoft', 5664),
       ('喋血復仇', '動作', 'action/B4B.png', '《喋血復仇》是一款合作射擊遊戲，由原《惡靈勢力2》團隊開發。玩家與其他玩家合作，在殭屍災難中生存並打敗強大的Boss。', 1400, '18', 'Turtle Rock', 'WBIE', 5332),
       ('重金屬：地獄歌手', '動作', 'action/Metal_Hellsinger.jpg', '《重金屬：地獄歌手》是一款結合音樂節奏和射擊的遊戲，玩家與魔鬼作戰，隨著節奏進行攻擊，挑戰強大的敵人。', 750, '18', 'The Outsiders', 'Funcom', 6224),
       ('人類：一敗塗地', '動作', 'action/human_fall.jpg', '《人類：一敗塗地》是一款物理遊戲，玩家扮演彎曲的角色，在夢幻世界中探索、攀爬、推動物體，解決各種謎題。', 600, '6', 'No Brakes Games', 'Curve Digital', 6556),
       ('戰鎚40K：黑潮', '動作', 'action/Darktide.jfif', '《戰鎚40K：黑潮》是一款合作射擊遊戲，玩家進入黑暗世界，面對各種敵人，獲得經驗和裝備，探索故事背景和世界觀。', 960, '12', 'Fatshark', 'Fatshark', 7281),
       ('塞爾達傳說 曠野之息', '冒險', 'adventure/zelda.png', '《塞爾達傳說 曠野之息》是一款開放世界的冒險遊戲，玩家扮演林克，在廣闊的世界中探索，體驗深度的遊戲劇情。', 1490, '12', 'Nintendo', 'Nintendo', 11221),
       ('霍格華茲的傳承', '冒險', 'adventure/hogwarts_legacy.jpg', '《霍格華茲的傳承》是一款以哈利波特世界為背景的角色扮演遊戲，玩家扮演魔法師，探索魔法世界、學習魔法、體驗故事。', 1800, '12', 'Avalanche', 'Portkey Games', 12110),
       ('黑色沙漠', '冒險', 'adventure/Black_Desert.jpg', '《黑色沙漠》是一款多人在線遊戲，以沙盒遊戲為主，可以在豐富的世界自由探索、狩獵、鍛造、種植、貿易等，還有豐富的故事。', 200, '12', 'Pearl Abyss', 'Daum', 8012),
       ('魔物獵人 世界', '冒險', 'adventure/Monster_Hunter.jpg', '《魔物獵人 世界》是一款大型角色扮演遊戲，玩家與玩家合作，探索廣大的世界、狩獵怪獸、鍛造裝備，體驗高度成就感的狩獵遊戲。', 920, '12', 'Capcom', 'Capcom', 9213),
       ('陰森之子', '冒險', 'adventure/Sons_of_the_Forest.jpg', '《陰森之子》是一款生存遊戲，玩家在森林中探索、生存、解謎，面對各種可怕的生物，尋找真相。遊戲有驚人的體驗和豐富的劇情。', 490, '18', 'Endnight Games', 'Newnight', 9652),
       ('綠色地獄', '冒險', 'adventure/GREEN_HELL.jpg', '《綠色地獄》是一款生存恐怖遊戲，玩家在叢林中生存、尋找食物、建造住所，同時還要應對疾病和其他危險。具有極高的挑戰性和獨特的風格。', 410, '18', 'Creepy Jar', 'Creepy Jar', 5501),
       ('方舟：生存進化', '冒險', 'adventure/ARK.jpg', '《方舟：生存進化》是一款生存遊戲，玩家在史前世界生存、建造基地、養殖恐龍、戰鬥，與其他玩家或者獸類對抗，體驗沙盒遊戲風格。', 320, '12', 'Studio Wildcard', 'Studio Wildcard', 8032),
       ('異塵餘生4', '冒險', 'adventure/Fallout4.png', '《異塵餘生4》是一款末日冒險遊戲，以核災後的美國為背景，玩家在荒蕪世界尋找資源、完成任務。游戲有許多道德選擇，可以自由探索世界。', 599, '12', 'Bethesda', 'Bethesda', 9120),
       ('刺客教條3', '冒險', 'adventure/assassins.jpg', '《刺客教條3》是一款以獨立戰爭為背景的冒險遊戲，玩家扮演印第安的殺手，透過探索世界、完成任務、進行潛行和戰鬥等遊戲內容。', 565, '12', 'Ubisoft', 'Ubisoft', 8563),
       ('BeamNG.drive', '模擬', 'simulation/BeamNG_drive.jpg', '《BeamNG.drive》是一款真實物理模擬遊戲，玩家駕駛各種車輛，體驗逼真的碰撞、損壞和物理效果，並與其他玩家分享自己的創作。', 378, '12', 'BeamNG', 'BeamNG', 9012),
       ('模擬市民4', '模擬', 'simulation/theSims4.jpg', '《模擬市民4》是一款模擬人生的遊戲，可以創建虛擬人物、建造房屋、發展職業、社交互動、體驗各種生活事件和情感體驗，並自由創作和分享。', 200, '0', 'Maxis', 'EA', 13031),
       ('密室逃脫模擬器', '模擬', 'simulation/Escape_simulator.jpg', '《密室逃脫模擬器》是一款逃脫類型的遊戲，玩家在虛擬世界中尋找線索、解謎、找到出口，避開障礙和敵人，進行越獄或逃脫。', 266, '6', 'Pine Studio', 'Pine Studio', 8801),
       ('漁帆暗湧', '模擬', 'simulation/DREDGE.jpg', '《漁帆暗湧》是一款模擬捕魚遊戲，玩家可以進行釣魚、升級船隻、完成支線任務等。此外，到了夜晚還會觸發恐慌，遊戲玩法很新奇。', 750, '6', 'Black Salt Games', 'Team17', 6551),
       ('海港物語', '模擬', 'simulation/Havendock.jpg', '《海港物語》放在這個舒適的模擬遊戲中好好發揮吧。建造屬於流放者的避風灣、管理資源，並在一片汪洋上活出最精彩的人生。', 266, '0', 'YYZ', 'IndieArk', 4331),
       ('大都會：天際', '模擬', 'simulation/Cities.jpg', '《大都會：天際》是一款模擬城市建設的遊戲，建立自己的城市，滿足市民的需求，並控制城市的發展和進步，以創建更具個性化的城市。', 808, '0', 'Colossal Order', 'Paradox Interactive', 8312),
       ('動物園之星', '模擬', 'simulation/Planet_Zoo.jpg', '《動物園之星》是一款動物主題的模擬遊戲，玩家可以創建自己的動物園、照顧動物，提供了豐富的種類和建築，讓玩家打造自己的夢幻動物園。', 975, '0', 'Frontier Developments', 'Frontier Developments', 7221),
       ('浪貓', '模擬', 'simulation/stray.jpg', '《浪貓》是一款未來世界背景下遊戲，玩家扮演廢棄都市中的貓，探索城市和解謎題，和機器人或動物互動，揭開一個關於未來和人工智慧的神秘故事。', 539, '6', 'BlueTwelve', 'Annapurna Interactive', 8801),
       ('全面戰爭模擬器', '模擬', 'simulation/TABS.jpg', '《全面戰爭模擬器》是一款獨特的戰爭遊戲，以荒謬方式展現戰爭，玩家創建並控制軍隊，每個單位都有特點，玩家需要選擇最佳佈局來獲勝。', 318, '6', 'Landfall', 'Landfall', 9235),
       ('文明帝國6', '策略', 'strategy/Civilization.jpg', '《文明帝國6》是一款策略遊戲，玩家控制文明，透過發展科技、建立城市和擴張領土，贏得勝利。遊戲提供歷史和文化，玩家體驗各種文明。', 975, '6', 'Firaxis Games', '2K', 7512),
       ('世紀帝國4', '策略', 'strategy/AOE4.jpg', '《世紀帝國4》是一款即時戰略遊戲，採用全新的遊戲引擎和畫面。玩家可以控制自己的文明，建立城市、招募士兵，並在歷史上的戰爭中取得勝利。', 679, '6', 'Relic Entertainment', 'Xbox Game', 9288),
       ('世紀帝國2：決定版', '策略', 'strategy/AOE2.jpg', '《世紀帝國2：決定版》是一款即時戰略遊戲，採用全新的遊戲引擎和畫面。玩家可以控制自己的文明，建立城市、招募士兵，在各種戰場取得勝利。', 679, '6', 'Forgotten Empires', 'Xbox Game', 9032),
       ('人類', '策略', 'strategy/humankind.jpg', '《人類》為一款歷史宏觀的策略遊戲，你將重寫人類的進化過程，包括文化、歷史和價值觀等，創造出獨一無二的文明。你會帶領人們的將來走到多遠呢？', 1390, '12', 'AMPLITUDE Studios', 'SEGA', 8123),
       ('英雄連隊3', '策略', 'strategy/Company_of_heroes_3.jpg', '《英雄連隊3》是一款戰略遊戲，採用二戰背景，玩家控制軍隊戰鬥。有高度的戰略性和深度，提供單人和多人模式，以及豐富的戰爭場景和兵種。', 1590, '12', 'Relic Entertainment', 'SEGA', 8612), 
       ('神話世紀', '策略', 'strategy/Age_of_Mythology.jpg', '《神話世紀》是一款即時戰略遊戲，以古希臘、北歐、埃及三大神話為背景，玩家可以控制自己的文明建設城池、招募士兵、探索神話，並與其他文明進行戰爭。', 688, '12', 'SkyBox Labs', 'Xbox Game', 7022), 
       ('美麗新世界 1800', '策略', 'strategy/Anno_1800.png', '《美麗新世界 1800》是城市模擬遊戲，以工業革命為背景，玩家要在建設城市的同時發展經濟，管理資源，與其他玩家進行貿易，打造自己的帝國。', 688, '12', 'SkyBox Labs', 'Xbox Game', 7051), 
       ('聖火降魔錄', '策略', 'strategy/Fire_Emblem_engage.jpg', '《聖火降魔錄》是一款角色扮演策略遊戲，玩家扮演著一個英雄，與同伴們對抗邪惡勢力。玩家通過戰鬥和探索來提升自己，打造出屬於自己的最強英雄。', 1550, '12', 'Intelligent Systems', 'Nintendo', 7112), 
       ('三國志14', '策略', 'strategy/three_kingdoms_14.jpg', '《三國志14》是一款以三國時代為背景的戰略模擬遊戲，玩家可以扮演各大勢力的領袖，掌握政治、軍事、外交等各個方面，逐步擴張領土，統一中國。', 1790, '12', 'KOEI TECMO', 'KOEI TECMO', 5051), 
       ('NBA 2K19', '運動與競技', 'Sports_and_racing/nba2k.jpg', '《NBA 2K19》是一款籃球競技遊戲。玩家可創建自己的球員，並控制球隊進行比賽。遊戲模擬了真實的NBA比賽，擁有多種模式和豐富的球員資料庫。', 600, '0', 'Visual Concepts', '2K Sports', 7512), 
       ('鬥陣特工2', '運動與競技', 'Sports_and_racing/overwatch.jpg', '《鬥陣特工2》是一款多人遊戲，玩家透過角色技能、策略和配合取勝，並且有多種遊戲模式可供選擇，如控制點、護送貨物、攻擊/防禦等，深受玩家喜愛。', 938, '12', 'Visual Concepts', '2K Sports', 8088), 
       ('糖豆人', '運動與競技', 'Sports_and_racing/fall_guys.jpg', '《糖豆人》是一款多人競技遊戲。遊戲中玩家需要通過多個關卡，爭取最後成為最後一名站立的Fall Guy。遊戲風格繽紛活潑，具有趣味性和互動性。', 938, '6', 'Mediatonic', 'Epic', 12012), 
       ('FIFA21', '運動與競技', 'Sports_and_racing/fifa21.webp', '《FIFA21》是一款足球運動遊戲。遊戲提供包括世界各地的球隊、球員和比賽場地，玩家可以體驗逼真的比賽畫面，參加多種賽事等。', 1770, '0', 'EA', 'EA', 7903), 
       ('舞力全開', '運動與競技', 'Sports_and_racing/just_dance.jpg', '《舞力全開》是一個跳舞音樂遊戲，玩家跟著舞者的動作節奏舞動，搭配音樂曲目和舞蹈風格。遊戲有多人模式，與其他玩家一同競賽。', 570, '0', 'Ubisoft', 'Ubisoft', 5505), 
       ('極限競速5', '運動與競技', 'Sports_and_racing/Forza.webp', '《極限競速5》是一款以街頭賽車為主題的競速遊戲，玩家可以自由改裝車輛、調整性能，挑戰各種賽事，並與其他玩家進行線上對戰。', 800, '6', 'Turn 10 Studios', 'Microsoft', 7021), 
       ('RiMS Racing', '運動與競技', 'Sports_and_racing/RiMS.jpg', '《RiMS Racing》是一款摩托車競速模擬遊戲，玩家體驗高度還原的摩托車騎乘體驗，並進行賽道上的激烈競爭，透過修整、改裝提升車輛性能，贏取榮譽。', 660, '6', 'RaceWard', 'Nacon', 5002)

