//데이터베이스를 tutorial로 선정
use tutorial

//users 컬렉션에 username이 smith인 문서 저장
db.users.insertOne({username:"smith"})
//users 컬렉션에 username이 jones인 문서 저장
db.users.insertOne({username:"jones"})

// 앞에서 저장한 모든 문서 출력
db.users.find({})//모두 다 조회

//앞에서 저장한 문서 중 하나만 출력
db.users.findOne()

//users 컬렉션에서 username이 jones인 문서를 찾아서 출력
db.users.find({username:"jones"})

//users 컬렉션에서 username이 "jones" 또는 "smith"인 문서를 찾아 출력
db.users.find({
    $or: [
        {username:"smith"},
        {username:"jones"}
    ]
})

//users 컬렉션에서 username이 smith인 문서에 country키가 Canada가 되도록 수정
db.users.updateOne(
    {username:"smith"},//쿼리 설렉터, 어떤 문서를 선택할 것인지
    {$set:{country:"Canada"}}) //{$set/$usnet: {바꿀 필드: 값}}
//앞의 문서가 올바르게 수정되었는지 확인
db.users.find({username:"smith"})

//users 컬렉션에서 username이 smith인 문서를 {country:"Canada"}로 대체하고 확인
db.users.replaceOne({username:"smith"},{country2:"Canada"})
db.users.find()

//users 컬렉션에서 country가 Candada 인 문서를 {username: "smith", country:"Canada"}로 대체하고 확인
db.users.updateOne({country:"Canada"},{username:"smith",country:"Canada"})

//users 컬렉션에서 username이 smith인 문서에 country 키를 삭제하고 삭제 여부 확인
db.users.updateOne({username:"smith"},{$unset:{country:1}})
db.users.find({username:"smith"})

//데이터베이스 전체 목록 출력
show dbs

//현재 사용 중인 데이터베이스의 컬렉션 목록 출력
show collections

//현재 사용 중인 데이터베이스와 users 컬렉션의 상태 출력
db.runCommand({dbStats:1})
db.runCommand({collStats:"users"})

//users 컬렉션의 모든 문서 삭제하고 삭제 여부 확인
db.users.deleteMany({})

//users 컬렉션 삭제
db.users.drop()

//문서 20,000건 추가
use test;

let bulk = [];
for (let i = 0; i < 20000; i++) {
    bulk.push({ num: i, name: "스마트폰" + i });

    // 1000건 단위로 나누어 insert
    if (bulk.length === 1000) {
        db.product.insertMany(bulk);
        bulk = [];
    }
}

// 남은 문서가 있다면 추가로 insert
if (bulk.length > 0) {
    db.product.insertMany(bulk);
}

//product 컬렉션의 전체 문서수 출력
db.product.countDocuments()

//product 컬렉션의 문서를 num의 내림차순으로 정렬하여 출력
db.product.createIndex({ num: -1 });

// product 컬렉션의 문서를 num의 내림차순으로 정렬하여 상위 10건 출력
db.product.createIndex({ num: -1 });
db.product.find().sort({ num: -1 }).limit(10);

// product 컬렉션의 문서를 num의 내림차순으로 정렬한 상태에서 다음을 처리
// 한 페이지당 10건씩 출력
//6페이지에 해당하는 문서 출력
db.product.find()
    .sort({ num: -1 })   // num 내림차순
    .skip(50)            // (페이지번호 - 1) * 페이지당 문서 수
    .limit(10);          // 10건 출력

// product 컬렉션에서 num이 15미만이거나 19995 초과인 것 출력
db.product.find({
    $or: [
        { num: { $lt: 15 } },
        { num: { $gt: 19995 } }
    ]
});

// product 컬렉션에서 name이 '스마트폰 10','스마트폰 100','스마트폰 1000' 중에 하나이면 출력하세요.
db.product.find({
    name: { $in: ['스마트폰 10', '스마트폰 100', '스마트폰 1000'] }
});

// product 컬렉션에서 num이 5보다 작은 문서를 출력하는데, name만 출력하세요. (_id 출력하면 안됨)
db.product.find(
    { num: { $lt: 5 } },     // 조건: num < 5
    { _id: 0, name: 1 }       // 출력 필드: name만 출력, _id는 제외
);
