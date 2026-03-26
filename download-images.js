const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const images = {
  "hero": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c23e476b-5a58-4543-832a-072240596281.png?w=672&e=webp&nll=true&cX=38&cY=0&cW=949&cH=1280"
  ],
  "zidans": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-1ad4e4f2-d71c-4d00-80ad-6979859fa720.jpg?w=537&e=webp&cX=0&cY=3&cW=1728&cH=2155",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-701af871-991e-4327-96e3-cc96aa9f403b.jpg?w=505&e=webp&cX=0&cY=3&cW=900&cH=1194",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-aa55e045-3a2f-48f1-84b4-4ccea7eba609.jpg?w=537&e=webp&cX=0&cY=1&cW=960&cH=1197",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-5a2d2233-8428-40b2-b1db-268a488fd3ce.jpg?w=505&e=webp&cX=0&cY=6&cW=1620&cH=2149",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2454ae93-c79e-4fde-8459-45a2e0d6756c.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-d5b96865-46cf-486f-837e-1b75e341b11e.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-3f4b5c38-6053-4cc9-bd52-90de26d0ac11.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c04e9b93-9756-40fe-aedf-364bf043bd78.jpg?w=616&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-520cffdc-1d49-45f2-838a-7c3e135f00ac.jpg?w=514&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-0cd90608-845f-4d4b-8603-0761e2f42343.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-46641596-3484-4230-b742-d54047d56ad1.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-d365f21a-8f71-4c2a-96b0-4ccfeacc4ccd.jpg?w=513&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-473fa883-c3c5-4b7a-b161-97237660e60f.jpg?w=674&e=webp&cX=1&cY=0&cW=1278&cH=848",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-67a3e014-c872-4729-8ae1-3b3580e6b63a.jpg?w=672&e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2353a574-d0f1-4954-a9fa-4a96bc09ee85.jpg?w=672&e=webp&cX=0&cY=1&cW=2560&cH=1696",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a9978146-8a54-4a77-bb10-95dc725ac2c3.png?w=484&e=webp&nll=true&cX=0&cY=2&cW=827&cH=1251",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-392eced4-2d04-4799-8275-3a3e79eb6798.png?w=486&e=webp&nll=true&cX=1&cY=0&cW=832&cH=1254",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ecdd306f-6881-494e-826b-eedf02253aef.png?w=484&e=webp&nll=true&cX=0&cY=1&cW=827&cH=1251",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-116b2a37-b2ac-43ed-882b-d52b835cc33e.png?w=484&e=webp&nll=true&cX=0&cY=0&cW=828&cH=1253",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-6f9303db-a3f5-4cc5-b66c-972aa2093e56.png?w=612&e=webp&nll=true&cX=1&cY=0&cW=827&cH=1257",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-6b272572-7370-4ac1-80f9-bfc20b13d0d1.jpg?w=490&e=webp&cX=0&cY=1&cW=1024&cH=1279",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a2e7922d-654f-479a-b514-2920c93a026a.jpg?w=490&e=webp&cX=0&cY=1&cW=1024&cH=1279",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-5cfd7bd1-4383-41f2-b601-6b1c2fc2b29c.jpg?w=490&e=webp&cX=0&cY=1&cW=1728&cH=2158",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a31978ef-d2ba-421f-a2b3-d1323f88d42e.png?w=407&e=webp&nll=true&cX=0&cY=1&cW=832&cH=1252",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-4efc8084-6c94-4503-92ed-aeaa035d7778.png?w=411&e=webp&nll=true&cX=1&cY=0&cW=830&cH=1254",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-b37d371a-82c0-4af7-9855-194981ece917.jpg?w=1044&e=webp&cX=0&cY=2&cW=1280&cH=845",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-32fdf21b-00f6-47ce-9356-c72cb785d04e.jpg?w=1040&e=webp"
  ],
  "prints": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-d45b5042-1020-4262-8860-767e24ae591f.jpg?w=574&e=webp&cX=1&cY=0&cW=1317&cH=1755",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-0c0c11e1-479f-42b0-a5e5-5b5d1371bf5e.jpg?w=574&e=webp&cX=1&cY=0&cW=1317&cH=1755",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e8ac4b20-9868-4193-9e40-6e61be4114d2.png?e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-48adf65b-3910-441f-b890-05c27912df75.png?w=276&e=webp&nll=true&cX=2&cY=0&cW=285&cH=236",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-3d90f4e7-bc45-4160-9b83-2cfeb545053f.png?e=webp&nll=true&cX=0&cY=2&cW=300&cH=381",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f1af67d9-5fcd-46f8-8f9d-109d79628b22.png?e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a3d2e2c6-8445-4878-bbb3-3dc36083d819.png?e=webp&nll=true&cX=2&cY=0&cW=363&cH=127",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-80ea3b5d-2243-487d-95d7-73a057771a90.png?w=233&e=webp&nll=true&cX=0&cY=2&cW=274&cH=219"
  ],
  "popmolly": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2fa39984-c6ae-4a90-93a8-948feac52c30.webp?w=469&e=webp&cX=0&cY=1&cW=666&cH=997",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-89d51420-7823-4301-a0b0-314395cdfcb6.webp?w=469&e=webp&cX=0&cY=1&cW=666&cH=997",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-1d30c0be-7f65-4744-af18-466ec3256ba7.webp?w=469&e=webp&cX=0&cY=1&cW=666&cH=997",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e9331f15-abec-4d23-9704-7aaf3922492d.webp?w=469&e=webp&cX=0&cY=1&cW=666&cH=997",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-33f8fa1a-045a-4aec-abb8-7f19f02eb10d.jpg?w=565&e=webp&cX=0&cY=2&cW=1080&cH=1342",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e0d35ae3-1349-43b8-ab9d-beb34fe3cb59.jpg?w=565&e=webp&cX=0&cY=2&cW=1080&cH=1342",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c2f8b083-cd16-4a4e-9988-48c971b46aba.png?w=317&e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e2337f3e-a628-46d1-9a7c-c5b654f21e39.webp?w=317&e=webp&cX=1&cY=0&cW=490&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-8215a198-9187-4edf-a123-eaad294905eb.jpg?w=370&e=webp&cX=0&cY=1&cW=1045&cH=1347",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-db658f1c-6517-4990-8822-a997092d67bb.jpg?w=317&e=webp&cX=1&cY=0&cW=478&cH=720",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f75701b3-3e1e-4f8a-b382-8c062c5cb727.jpg?w=385&e=webp&cX=0&cY=4&cW=1080&cH=1338",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e2df9efb-6fb5-4afd-8e9a-5aa81455d32b.webp?w=317&e=webp&cX=1&cY=0&cW=490&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-8fbfd09f-edc0-44f8-bcfe-8bb07701aa35.webp?w=317&e=webp&cX=1&cY=0&cW=490&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-56d945eb-eaf4-4aeb-aa8a-439fd5e2e10e.jpg?w=317&e=webp&cX=1&cY=0&cW=490&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-039e5c64-42cc-4ef8-8281-ee6bc76192b6.jpg?w=353&e=webp&cX=0&cY=3&cW=995&cH=1345",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ec19ab82-0b63-4511-8650-ab83faa77be3.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-253d2e7c-6d3e-4a2b-9d0c-c5d0a2795e4e.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-8fed5843-5900-48db-b433-e94c925d4aa8.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-0d4aca41-b16c-4b6a-be95-ba09195f1d50.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-bb74df2f-1fb2-42bd-af7f-688e2f9c26dd.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c83dc3c5-3338-4583-9e72-d6fa7e9d8b2c.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-131cc5c5-5f0d-4cec-a7be-021b74a80f1d.jpg?w=445&e=webp&cX=0&cY=1&cW=683&cH=1021"
  ],
  "mockups": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f71ae4d3-b8a8-41f9-b6ec-7737801f4c00.png?w=255&e=webp&nll=true&cX=1&cY=0&cW=405&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-72d636c6-d261-4154-893d-61e97373c279.png?w=188&e=webp&nll=true&cX=1&cY=0&cW=482&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2b37d92d-8dcd-4835-abb5-4f189bfd31a6.png?w=184&e=webp&nll=true&cX=0&cY=2&cW=452&cH=736",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-bb6a2a52-472e-402a-9153-c918156699fe.png?w=199&e=webp&nll=true&cX=0&cY=5&cW=336&cH=730",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-993e2aa2-83c0-4872-b25e-afe20283739d.png?w=265&e=webp&nll=true&cX=2&cY=0&cW=521&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-d86a1183-733a-4ed6-b346-67b8218af5df.png?w=182&e=webp&nll=true&cX=7&cY=0&cW=860&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a8d2cfc1-ed5b-44ba-b212-0151fe51c398.png?w=167&e=webp&nll=true&cX=0&cY=38&cW=750&cH=663",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ee3a7d4e-7227-4651-a8ff-8443f45be090.png?w=225&e=webp&nll=true&cX=2&cY=0&cW=400&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ec615c95-075e-46c1-9d2f-2c6626087f56.png?w=182&e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a3b719a0-6512-4412-974e-7b8a3656ab46.png?w=182&e=webp&nll=true&cX=0&cY=2&cW=383&cH=734",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-aaf99f19-50fc-4d34-97d8-7505b2b7402c.png?w=225&e=webp&nll=true&cX=0&cY=1&cW=403&cH=737",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-526212c5-4380-4add-a8a6-af89d5dafd11.png?w=238&e=webp&nll=true&cX=0&cY=0&cW=519&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-bc1aeda0-1474-4f59-8e7a-b65f9465d305.png?w=244&e=webp&nll=true&cX=2&cY=0&cW=533&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-9f0aa3c1-e35c-4c01-a1b9-a41d87efecb2.png?w=201&e=webp&nll=true&cX=72&cY=21&cW=545&cH=690",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c66b80b3-47bf-4683-9089-64318047ec08.png?w=167&e=webp&nll=true&cX=1&cY=0&cW=648&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-b5ea3d73-7ab8-4570-8029-fca66e77e8fe.png?w=214&e=webp&nll=true&cX=0&cY=3&cW=551&cH=733",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f53ae12f-6d53-443c-be89-8fcc0eea7968.png?w=214&e=webp&nll=true&cX=4&cY=0&cW=577&cH=739",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-1a961dd2-d680-49c7-95a0-6299418b29c6.png?w=161&e=webp&nll=true&cX=0&cY=1&cW=709&cH=737"
  ],
  "sketches-1": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-917fa429-3d3c-4152-b16d-b27ac563211a.jpg?w=828&e=webp&cX=0&cY=7&cW=3165&cH=2535",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-247a9021-0440-42fb-a7ee-31ea926f42e9.jpg?w=809&e=webp&cX=0&cY=3&cW=3101&cH=2543",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-26fe98ae-4e61-4399-963f-ad152a5dc556.jpg?w=910&e=webp&cX=5&cY=0&cW=6615&cH=4825"
  ],
  "sketches-2": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2f3be294-7dba-46ce-b477-24db072dba4d.png?w=957&e=webp&nll=true&cX=0&cY=13&cW=2661&cH=1476",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-a5028506-5be8-44c5-9add-ea8f270d770a.png?w=957&e=webp&nll=true&cX=0&cY=15&cW=2641&cH=1442",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-3812299f-f354-4894-bb95-0b361d454389.png?w=957&e=webp&nll=true&cX=0&cY=15&cW=2684&cH=1465",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-65393990-1d3e-467b-b9c6-66ec644a2dff.png?w=492&e=webp&nll=true&cX=0&cY=18&cW=1394&cH=1897",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-969bb1c8-3675-4675-ac52-22eacb24329e.png?w=514&e=webp&nll=true&cX=0&cY=18&cW=1228&cH=1602",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-9531ed0b-2596-409a-b5e0-23cfd9962c26.png?w=512&e=webp&nll=true&cX=0&cY=16&cW=1222&cH=1600",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c1b81d13-0eba-400f-9e7c-2894c4468826.png?w=1524&e=webp&nll=true&cX=0&cY=10&cW=2787&cH=869",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-7461a29a-8e30-48ca-b6b6-2f894382c628.png?w=1473&e=webp&nll=true&cX=0&cY=10&cW=2562&cH=819",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2b6a9e91-b395-4900-b9b6-6dce1bab40f0.png?w=1175&e=webp&nll=true&cX=0&cY=10&cW=2037&cH=865",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-92c7df35-7fdc-48d0-8657-0ade9e3ed7e6.png?w=1252&e=webp&nll=true&cX=51&cY=9&cW=2137&cH=847",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-81f8addf-196c-471f-9f21-7ecff5ad7829.jpg?w=317&e=webp&cX=159&cY=39&cW=2038&cH=3443",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-9a8b8990-30e4-4a91-9624-f0e30502adea.jpg?w=297&e=webp&cX=141&cY=35&cW=2041&cH=3451",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-89758872-dd93-4542-a226-16d20ec8b0f9.jpg?w=312&e=webp&cX=42&cY=38&cW=2140&cH=3445",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-fff84922-9811-4033-aa8a-2b73891a4000.png?w=1115&e=webp&nll=true&cX=0&cY=3&cW=2139&cH=928",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-99524a43-1b8a-4c1e-bc52-b7ecef0b1a7b.png?w=1047&e=webp&nll=true&cX=0&cY=12&cW=1365&cH=977",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f58ca9c6-b81e-41eb-8726-8a922a96215c.png?w=1004&e=webp&nll=true&cX=0&cY=33&cW=4684&cH=3146",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c810e91b-65a5-4300-afd8-d86553a6ee02.png?w=918&e=webp&nll=true&cX=0&cY=10&cW=1500&cH=979"
  ],
  "yana-maron": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-3ce3ec91-b01c-46f4-9a6a-dc3eb7fea70d.jpg?e=webp&cX=0&cY=45&cW=720&cH=1190",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-0f6ba8b6-141d-459f-92c2-df8f9998d0d1.jpg?w=629&e=webp&cX=0&cY=44&cW=1280&cH=1193",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-fcddb75e-7ead-49fd-983b-317a2891f830.jpg?w=417&e=webp&cX=0&cY=88&cW=1697&cH=2384",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-259f7dc3-8557-404c-a175-748f10932d16.jpg?w=841&e=webp&cX=0&cY=60&cW=2560&cH=1576",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-e3f0633a-cf94-4161-a0c9-c00e5a114749.jpg?w=841&e=webp&cX=0&cY=60&cW=2560&cH=1576",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-20afaac4-ee1f-4066-8519-2c201eb77497.jpg?w=417&e=webp&cX=0&cY=88&cW=1697&cH=2384",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ab8ca2dd-032a-4dae-9720-8e2b44fceeef.jpg?w=417&e=webp&cX=0&cY=88&cW=1697&cH=2384"
  ],
  "fucking-birthday": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c3a54772-b2dc-48ce-a118-5edac9f86ec4.jpg?e=webp&cX=1&cY=0&cW=827&cH=823",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-5738261d-5033-4dda-8580-60fae1a5e27e.png?w=993&e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-fe199568-455a-496b-b8aa-04109f590c0e.png?w=993&e=webp&nll=true&cX=1&cY=0&cW=1102&cH=679",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-8d3ef339-4dcc-4da9-bebd-357618964bc3.jpg?e=webp&cX=1&cY=0&cW=826&cH=461",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-22f01305-4274-4365-af90-b476926735ad.jpg?e=webp&cX=13&cY=0&cW=802&cH=1175",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-be6087ce-16e0-472d-9d39-46caea250cbe.jpg?e=webp&cX=1&cY=0&cW=827&cH=1221",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-1c0d5ee4-676a-4bdc-ab79-b0273a0bccf5.jpg?e=webp"
  ],
  "oqjav": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-efc221d2-3080-4eb0-99c5-7cc403df8c2f.png?w=1010&e=webp&nll=true&cX=0&cY=0&cW=3198&cH=1741",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-bbda51b3-a9f8-4c70-aa6b-6c35f73ecde6.png?w=1010&e=webp&nll=true&cX=0&cY=2&cW=3199&cH=1749",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-8fa1a93e-4db7-46a5-935f-da2886fa6c3a.png?w=1010&e=webp&nll=true&cX=0&cY=3&cW=3199&cH=1742",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-c90ef45a-e88e-423f-ab24-86e6ae4ea7ec.png?w=1010&e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-1c766379-1760-4ec9-9acd-103a3d323a84.png?w=1010&e=webp&nll=true&cX=0&cY=5&cW=3199&cH=1728",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-9d68b3d4-08ac-47f1-9287-210b71eebb2b.png?w=1010&e=webp&nll=true&cX=0&cY=2&cW=3199&cH=1749",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2d0cf75a-3b2b-4d1c-b9c6-e64f5cf968ee.png?w=1010&e=webp&nll=true&cX=0&cY=3&cW=3199&cH=1749",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-bc01a86e-502c-4a4f-9cc9-e907f25a4dc3.png?w=1010&e=webp&nll=true&cX=1&cY=0&cW=3197&cH=1741"
  ],
  "lucidvox": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-54fea86d-6a99-459a-9a81-6c9a8324f386.png?w=1520&e=webp&nll=true&cX=4&cY=0&cW=3190&cH=1321",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-db9997b5-fccf-47aa-a54c-aec1e2468f71.png?w=1520&e=webp&nll=true&cX=1&cY=0&cW=3197&cH=1342",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-50ac6fdd-d0bb-4f56-ada0-d7af7f1b7d32.png?w=1520&e=webp&nll=true&cX=0&cY=3&cW=3199&cH=1343",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-84d22c59-ac98-400b-98ad-df2beefcbafd.png?w=1520&e=webp&nll=true&cX=0&cY=0&cW=3199&cH=1347",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f9d273f6-e0d2-47df-bdf6-893e2a640c52.png?w=1520&e=webp&nll=true",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-22393e99-ed61-40d2-8764-1007f8843140.png?w=1520&e=webp&nll=true&cX=2&cY=0&cW=3195&cH=1341",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-4214f008-e348-4978-bd70-4929ee5b47b5.png?w=1520&e=webp&nll=true&cX=0&cY=2&cW=3199&cH=1338",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-2cb70396-337e-4f52-9479-4e30f06f5625.png?w=1520&e=webp&nll=true&cX=4&cY=0&cW=3191&cH=1335",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f8b59a61-fc7a-491b-91f3-7c8921fa06f3.png?w=1520&e=webp&nll=true&cX=4&cY=0&cW=3191&cH=1335"
  ],
  "exeed": [
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-07e018c3-320f-429c-ad64-989545a88e79.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-ac7d8320-7a7e-4f24-a8d0-72cdb5ce9f2d.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-6d1e0954-9a11-4faa-8015-1b05cdcfe327.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-aee444f5-e355-4f6c-9cb2-076eb977e6af.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-817709c1-0c24-4b35-b332-05361fd0f812.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-f5c4cf23-7964-492e-b671-5df4296a2245.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-303dc13f-b8d1-4039-8076-f18e1926241a.jpg?e=webp",
    "https://i-p.rmcdn.net/66c62eee8da8a90344d85cfc/5063048/image-44f1f5a0-748c-48f4-b419-bb90ad9eed44.jpg?e=webp"
  ]
};

async function main() {
  const base = 'public/images';
  for (const [section, urls] of Object.entries(images)) {
    console.log('Downloading ' + section + ' (' + urls.length + ' images)...');
    for (let i = 0; i < urls.length; i++) {
      const num = String(i + 1).padStart(2, '0');
      const ext = urls[i].includes('.png') ? 'png' : 'jpg';
      const dest = path.join(base, section, num + '.' + ext);
      try {
        await download(urls[i], dest);
        console.log('  done: ' + dest);
      } catch (e) {
        console.error('  fail: ' + dest + ': ' + e.message);
      }
    }
  }
  console.log('Done! All images downloaded.');
}

main();
