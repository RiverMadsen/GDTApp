const DBVERSION = 7;
const DBNAME = 'GDTAppDatabase';

export function updateKeyValueInStore(storeName: string, key: string, value: any) {
  const request = indexedDB.open(DBNAME, DBVERSION);

  request.onsuccess = function (event) {
    const db = request.result;
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const requestUpdate = objectStore.put(value, key);

    requestUpdate.onsuccess = function (event) {
      console.log('Key/Value pair updated successfully');
    };

    requestUpdate.onerror = function (event) {
      console.log('Error updating Key/Value pair', event);
    };
  };
}

export function getValueFromStore(storeName: string, key: any): Promise<any> {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open(DBNAME, DBVERSION);

      request.onsuccess = function(event) {
          const db = request.result;
          const transaction = db.transaction(storeName, 'readonly');
          const objectStore = transaction.objectStore(storeName);
          const requestGet = objectStore.get(key);

          requestGet.onsuccess = function(event) {
              resolve(requestGet.result);
          };

          requestGet.onerror = function(event) {
              reject('Error reading value');
          };
      };

      request.onerror = function(event) {
          reject('Error opening database');
      };
  });
}

export function initDB() {
  const gdtStore = "GDTSettings";
  const LRMaps = "LRMaps";
  // Swapped out with each new section
  const HRMaps = "HRMaps";
  const LRSat = "LRSat";
  // Swapped out with each new section
  const HRSat = "HRSat";
  const LRTrails = "LRTrails";
  // Loaded from zip and then persisted
  const HRTrails = "HRTrails";
  // Persisted
  const googleEarth = "googleEarth";
  // Persisted
  const guidebookImages = "guidebookImages";
  // Persisted
  const guidebookText = "guidebookText";


  const request = indexedDB.open('GDTAppDatabase', DBVERSION);
  let upgradeNeeded = false;

  request.onupgradeneeded = function (event) {

    const db = request.result;
    for (const storeName of [gdtStore, LRMaps, HRMaps, LRSat, HRSat, LRTrails, HRTrails, googleEarth, guidebookImages, guidebookText]) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    }

  };

  request.onerror = function (event) {
    console.log('Error opening database', event);
  };

  request.onsuccess = function (event) {
    const db = request.result;
    createDefaultSettings(db);
  };

  function createDefaultSettings(db: IDBDatabase) {
    const transaction = db.transaction(gdtStore, 'readwrite');
    const objectStore = transaction.objectStore(gdtStore);
    // Changes here are immediately reflected in the database after browser/db DBVERSIONrefresh regardless of version
    const defaultValues = [
      { key: "activeSection", value: "A" },
      { key: "sectionsDownloaded", value: [] },
      { key: "zipLocation", value: "" },
      { key: "extents", value: [{A:[-114.4769445997774,49.64483402829777,-114.5249906153733,49.62755439662014,-114.5554056751859,
        49.56417085914066,-114.4659162619954,49.47469906580347,-114.4400448668281,49.40386349555073,-114.4572228194685,
        49.3380898546954,-114.3901743378002,49.23921378464086,-114.3787793357051,49.19446470082875,-114.2773189619397,
        49.16460192174501,-114.2135801296469,49.15680381520704,-114.1808782138114,49.10782919299405,-114.0621211702771,
        49.0140523921674,-114.0291719397073,49.00164572624674,-114.0127796295189,48.99222584165689,-113.9020622974324,
        48.99159417140736,-113.8802254075314,49.03566134766481,-113.8660711166851,49.09448710581469,-113.9683923635832,
        49.20723750964658,-114.1849083205045,49.33701600020991,-114.3162176686137,49.37384939273436,-114.4205364956482,
        49.60873006970061,-114.4769445997774,49.64483402829777],B:[-115.1088824825143,50.620708775567,-115.125461640061,
          50.59969312819115,-115.1631454091739,50.49305471949435,-115.1519820728587,50.36077617752017,-114.9812840790263,
          50.34521390855131,-114.9013645581494,50.32658892910771,-114.7551908117618,50.1736698576171,-114.6701875745415,
          50.03348432332552,-114.7693714814425,49.92598085489138,-114.7799296614745,49.90334805292564,-114.7584625990884,
          49.7232785594861,-114.6300151510482,49.65553073874283,-114.5252697832803,49.63237763395748,-114.486172354064,
          49.63419145318618,-114.5883866393772,49.85126397486417,-114.3809052376268,49.90583530907963,-114.5766301590103,
          49.92909536788653,-114.5511148253953,49.98203664073337,-114.5661241416214,50.052866763415,-114.6519604115326,
          50.21079535776414,-114.587572226099,50.27743781142392,-114.6263865462582,50.36108338105378,-114.828735838528,
          50.40426392437287,-114.9850796354736,50.53623816481935,-115.1088824825143,50.620708775567],C:[-115.1049516614081,
            50.67449574175176,-115.1160447461521,50.69677999231939,-115.2959304547533,50.79258495829377,-115.3583081224252,
            50.87649459169984,-115.5307128104825,50.93106447866554,-115.5439008152004,51.01152156085843,-115.6592104243711,
            51.16263437050873,-115.69252004702,51.16728362325482,-115.796700987868,51.23364613511782,-115.9335969710595,
            51.27426712937202,-116.3698232482266,51.29719144867179,-116.4875203869724,51.40287491793837,-116.4981464134651,
            51.39068911957163,-116.5445491161988,51.36581770904371,-116.5868139941124,51.32911934335112,-116.174635234603,
            51.04760950398276,-116.0999261835976,51.02999270611409,-115.968549228037,51.08908819557652,-115.8353824202095,
            51.05600208170968,-115.6218209324594,50.86527503875394,-115.5065106494988,50.83639845192266,-115.4588544036124,
            50.74055217082869,-115.3094548079475,50.6055790848588,-115.2198152233725,50.55466450964887,-115.0901464221558,
            50.62234879387837,-115.1049516614081,50.67449574175176],D:[-116.6159990472274,51.36551316875476,-116.5217273476719,
              51.37548754461746,-116.4580320406251,51.39799256271572,-116.4379033060846,51.48914450585812,-116.4409789652356,
              51.49132101293532,-116.6116226357598,51.61803005509135,-116.7069347822512,51.79023039492133,-116.765563608243,
              51.89133148307452,-116.6772323384378,51.92916168976583,-116.708653269039,51.98199624055418,-116.7214148329126,
              51.98274930917722,-116.7619059964179,51.97772820097959,-116.8457631525255,51.9338093557811,-116.8495361117438,
              51.93156267595093,-116.7773513090316,51.65565393513378,-116.6946987338399,51.45944428761909,-116.6159990472274,
              51.36551316875476],E:[-117.3217239184161,52.55171514377382,-117.8228275893596,52.9048171432749,-118.0242645663506,
                52.94110386232605,-118.1052450410428,52.89254566512788,-118.0809499226119,52.84711334996664,-118.0323698006883,
                52.79581722168397,-117.8561152026809,52.74362085602602,-117.746929580149,52.64191753888596,-117.452538291142,
                52.44700414686852,-117.2603396810959,52.30233875365871,-117.0815364452253,52.17914879260449,-116.9330803093824,
                52.07707246269258,-116.8846572846098,52.05443725963183,-116.7444106614484,51.961518404222,-116.6224753016744,
                52.00734165075354,-117.3217239184161,52.55171514377382,],F:[-118.0728556269391,52.83242700004254,-118.0125094035935,
                  52.94429302723484,-118.1965354761734,52.91512324427294,-118.3546921787233,52.90507770123965,-118.4882988938606,
                  52.97904062202701,-118.7851517334153,53.1577793607543,-119.0056574754634,53.25860138567922,-119.2188132992053,
                  53.37414901866001,-119.3896935959001,53.391193459562,-119.5091747440059,53.38917671290818,-119.5647387981327,
                  53.40637469537077,-119.5898671777712,53.37223385496365,-119.6413985923957,53.34790648268601,-119.892531439701,
                  53.37864906026987,-119.9542546846189,53.35515707994509,-120.0368289790991,53.31926633069161,-120.0550585890244,
                  53.25827744521489,-120.0034687128975,53.23447566401278,-119.936196206623,53.30862800712996,-119.9353290958781,
                  53.3100175898177,-119.6813727311118,53.30170181329481,-119.5089214029335,53.28789534869685,-119.4699642927395,
                  53.32012911881012,-119.4688195195285,53.31936126567603,-119.2219425738878,53.16975558199246,-119.2617983514588,
                  53.12266321288586,-119.2625232741617,53.03543755117344,-118.809210337579,52.91349493414805,-118.404802110195,
                  52.8431851286907,-118.0931702056019,52.80441767431521,-118.0728556269391,52.83242700004254],G:[-120.0170996933352,
                    53.2188463269329,-119.9398089239686,53.30647299929996,-119.6256264670396,53.28720940751842,-119.516264790396,
                    53.31140107916948,-119.5304755818971,53.36421424669731,-119.5578495136087,53.40721640976176,-119.6856723766349,
                    53.54772329181613,-119.6705677492269,53.64814417284335,-119.0960245167715,53.84688654061332,-119.888773696948,
                    53.90775216223246,-120.1343563269464,54.02401347183376,-120.4735364398924,53.91282716245658,
                    0 -120.490400847548,53.91596362186284,-120.7765345005125,54.00107555392967,-120.9043976629655,53.95312516926106,
                    0 -120.9763894310485,53.68112059747885,-120.8673928887797,53.65031279952032,-120.7958165868697,53.84007823942094,0
                     -120.7035902334481,53.89611097298761,-120.4666931384477,53.78585824226543,-120.3073668398044,53.80028427625817,
                     -120.1874084165066,53.90219946294538,-120.0360575187972,53.76392179713395,-119.8548275833141,53.64013544536169,0
                      -119.8386217879784,53.42667459991308,-120.0528113548569,53.34691438825562,-120.0866736909025,53.2600085907329,
                      -120.0170996933352,53.2188463269329]}] },
      { key: "activeMapType", value: "Topo" },
      { key: "satHRThreshold", value: 5 },
      { key: "topoHRThreshold", value: 8 },
      { key: "lastExtent", value: [] },
      { key: "lastZoomLevel", value: 3 },
    ];
    for (const defaultValue of defaultValues) {
      const requestAdd = objectStore.put(defaultValue.value, defaultValue.key);

      requestAdd.onsuccess = function (event) {
        console.log('Key/Value pair added successfully');
      };

      requestAdd.onerror = function (event) {
        console.log('Error adding Key/Value pair', event);
      };
    }
  }
}