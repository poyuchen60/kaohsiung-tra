const ids = {"基隆":"1001","八堵":"1002","七堵":"1003","五堵":"1004","汐止":"1005","南港":"1006","松山":"1007","萬華":"1009","臺北":"1008","板橋":"1011","山佳":"1013","樹林":"1012","鶯歌":"1014","桃園":"1015","內壢":"1016","中壢":"1017","埔心":"1018","楊梅":"1019","富岡":"1020","湖口":"1021","新豐":"1022","竹北":"1023","北新竹":"1024","新竹":"1025","香山":"1026","崎頂":"1027","竹南":"1028","三坑":"1029","百福":"1030","汐科":"1031","浮洲":"1032","北湖":"1033","南樹林":"1034","三姓橋":"1035","新富":"1036","談文":"1102","大山":"1104","後龍":"1105","龍港":"1106","新埔":"1108","白沙屯":"1107","通霄":"1109","苑裡":"1110","日南":"1111","大甲":"1112","臺中港":"1113","清水":"1114","沙鹿":"1115","龍井":"1116","大肚":"1117","追分":"1118","彰化":"1120","花壇":"1202","員林":"1203","永靖":"1204","社頭":"1205","斗六":"1210","南靖":"1218","臺南":"1228","大橋":"1239","豐富":"1304","烏日":"1320","鳳山":"1402","南州":"1413","內獅":"1503","吉安":"1602","大富":"1613","關山":"1626","漢本":"1708","瑞芳":"1804","龜山":"1814","冬山":"1824","八斗子":"2003","千甲":"2212","樹調":"4102","斗南":"1211","新營":"1220","保安":"1229","嘉北":"1241","南勢":"1307","大慶":"1322","九曲堂":"1404","崁頂":"1412","加祿":"1502","康樂":"1517","萬榮":"1611","池上":"1624","南澳":"1705","暖暖":"1802","大里":"1812","中里":"1822","平溪":"1907","內灣":"2210","花蓮港":"3202","民雄":"1214","林鳳營":"1222","大湖":"1231","橋頭":"1234","南科":"1244","泰安":"1314","頭家厝":"1326","麟洛":"1408","枋寮":"1418","瀧溪":"1510","林榮新光":"1608","東里":"1621","臺東":"1632","景美":"1713","貢寮":"1809","四城":"1819","十分":"1904","九讚頭":"2207","龍泉":"2704","大林":"1213","柳營":"1221","路竹":"1232","新左營":"1242","銅鑼":"1308","太原":"1323","六塊厝":"1405","林邊":"1415","枋野":"1505","平和":"1605","瑞穗":"1616","瑞源":"1629","和仁":"1710","三貂嶺":"1806","頭城":"1816","蘇澳新":"1826","上員":"2204","六家":"2214","沙崙":"5102","石榴":"1209","隆田":"1223","岡山":"1233","仁德":"1243","三義":"1310","新烏日":"1324","屏東":"1406","佳冬":"1416","古莊":"1507","壽豐":"1606","三民":"1617","鹿野":"1630","崇德":"1711","牡丹":"1807","頂埔":"1817","蘇澳":"1827","竹東":"2205","源泉":"2702","海科館":"6103","林內":"1208","拔林":"1224","楠梓":"1235","內惟":"1245","后里":"1315","栗林":"1325","歸來":"1407","東海":"1417","大武":"1508","豐田":"1607","玉里":"1619","山里":"1631","新城":"1712","雙溪":"1808","礁溪":"1818","大華":"1903","橫山":"2206","濁水":"2703","石龜":"1212","善化":"1225","左營":"1236","三塊厝":"1247","潭子":"1318","精武":"1328","竹田":"1410","科工館":"1420","太麻里":"1514","鳳林":"1610","富里":"1623","東澳":"1704","花蓮":"1715","石城":"1811","二結":"1821","嶺腳":"1906","富貴":"2209","水里":"2706","嘉義":"1215","新市":"1226","高雄":"1238","造橋":"1302","臺中":"1319","五權":"1329","潮州":"1411","正義":"1421","知本":"1516","光復":"1612","海端":"1625","武塔":"1706","四腳亭":"1803","大溪":"1813","羅東":"1823","菁桐":"1908","榮華":"2211","車埕":"2707","二水":"1207","後壁":"1219","中洲":"1230","大村":"1240","苗栗":"1305","成功":"1321","後庄":"1403","鎮安":"1414","枋山":"1504","志學":"1604","富源":"1614","瑞和":"1628","和平":"1709","侯硐":"1805","外澳":"1815","新馬":"1825","竹中":"2203","新莊":"2213","長榮大學":"5101","田中":"1206","水上":"1217","永康":"1227","鼓山":"1237","美術館":"1246","豐原":"1317","松竹":"1327","西勢":"1409","民族":"1419","金崙":"1512","南平":"1609","東竹":"1622","永樂":"1703","北埔":"1714","福隆":"1810","宜蘭":"1820","望古":"1905","合興":"2208","集集":"2705"};
const trainType = {"1100":"自強","1101":"自強","1102":"太魯閣","1103":"自強","1106":"自強","1107":"普悠瑪","1108":"自強","1109":"自強","1110":"莒光","1111":"莒光","1114":"莒光","1115":"莒光","1120":"復興","1131":"區間車","1132":"區間快","1140":"普快車","110F":"自強","110A":"自強","110E":"自強","110B":"自強","110C":"自強","110D":"自強"}
const pad = number => number < 10 ? `0${number}` : `${number}`;
const estimatedTime = (departureTime, arrivalTime) => {
  const regExp = /(\d\d):(\d\d)/;
  const m1 = regExp.exec(departureTime), m2 = regExp.exec(arrivalTime);
  const s1 = Number(m1[1]) * 60 + Number(m1[2]);
  const s2 = Number(m2[1]) * 60 + Number(m2[2]);
  const result = s2 >= s1 ? (s2 - s1) : (1440 - s1 + s2);
  return `${pad(Math.trunc(result / 60))}:${pad(result % 60)}`;
}
const dateString = ( t = new Date()) => {
  const date = pad(t.getDate()),
    month = pad(t.getMonth() + 1),
    year = t.getFullYear();
  return `${year}-${month}-${date}`;
}
const timeString = ( t = new Date(), encode = true) =>
`${pad(t.getHours())}${encode ? '%3A' : ':'}${pad(t.getMinutes())}`
const dataFilter = trains => trains.map(({ 
  TrainNo, EndingStationName, DepartureTime,
  TrainTypeID, Direction, ScheduledDepartureTime, DelayTime,
}) => ({
  TrainNo, Direction, DelayTime,
  EndingStationName: EndingStationName.Zh_tw || EndingStationName,
  DepartureTime: DepartureTime || ScheduledDepartureTime.slice(0, -3),
  TrainTypeName: trainType[TrainTypeID]
}));
const routeFilter = trains => trains.map( ({
  DailyTrainInfo: {
    TrainNo, Direction, TrainTypeID
  },
  OriginStopTime: { DepartureTime },
  DestinationStopTime: { ArrivalTime }
}) => ({
  TrainNo, Direction,
  DepartureTime,
  ArrivalTime,
  EstimatedTime: estimatedTime(DepartureTime, ArrivalTime),
  TrainTypeName: trainType[TrainTypeID]
}))
const routeSorter = trains => {
  const current = timeString(new Date(), false);
  return trains
    .filter( t => t.DepartureTime >= current )
    .sort( (t1, t2) => 
      t1.DepartureTime > t2.DepartureTime
        ? 1
        : t1.DepartureTime < t2.DepartureTime ? -1 : 0
    );
}

const sortByDirection = trains => trains.reduce( (output, t) => {
  const { Direction } = t;
  output[Direction].trains.push(t);
  return output;
}, [{title: '順行', trains: []}, {title: '逆行', trains: []}]);
const getTrainsData = async (url, filter = dataFilter, sorter = sortByDirection) => await fetch(url)
  .then( res => res.json())
  .then( filter )
  .then( sorter )

const getLiveBoardByStationId = async id => {
  const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/LiveBoard/Station/${id}?$select=TrainNo%2CEndingStationName%2CScheduledDepartureTime%2CTrainTypeID%2CDirection%2CDelayTime&$format=JSON`
  const data = await getTrainsData(url)
  return data;
}
const getTrainsByStationId = async id => {
  const t = new Date();
  const current = timeString(t);
  const tString = dateString(t);
  const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/DailyTimetable/Station/${id}/${tString}?$select=TrainNo%2CDirection%2CTrainTypeID%2CEndingStationName%2CDepartureTime&$filter=DepartureTime%20gt%20'${current}'&$orderby=DepartureTime%20asc&$format=JSON`
  const data = await getTrainsData(url);
  const liveBoard = await getLiveBoardByStationId(id);
  const final = liveBoard.map( (d, i) => {
    let { trains } = d;
    if(trains.length < 1)
      return data[i]
    else {
      const trainIdOfLast = trains[trains.length - 1].TrainNo;
      const index = data[i].trains.findIndex( t => t.TrainNo === trainIdOfLast);
      trains = trains.concat(index >= 0 ? data[i].trains.slice(index + 1) : data[i].trains);
      return {title: d.title, trains};
    }
  })
  return final;
}
const getTrainsByRouteName = async (start, destination) => {
  const startId = ids[start], destinationId = ids[destination];
  const date = dateString();
  const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/DailyTimetable/OD/${startId}/to/${destinationId}/${date}?$select=DailyTrainInfo%2COriginStopTime%2CDestinationStopTime&$format=JSON`
  const data = await getTrainsData(url, routeFilter, trains => ([{
    title: `往 ${destination}`,
    trains: routeSorter(trains)
  }]));
  return data;
}

const getTrainsByStationName = name => getTrainsByStationId(ids[name]);

export default {
  getTrainsByStationId,
  getTrainsByStationName,
  getTrainsByRouteName,
};