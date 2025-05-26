use tutorial

//users 컬렉션에 {username:"smith"} 문서 추가
db.users.updateOne({username:"smith"},{$unset:{country:1}})

db.users.updateOne({
        username: "smith"},
    {
        $set: {
            favorites: {
                cities: ["Chicago", "Cheyenne"],
                movies: ["Casablance", "For a Few Dollars More", "The String"]
            }
        }

    })

//users 컬렉션에 {username:"jones"} 문서 추가
db.users.updateOne({username:"jones"},{$unset:{country:1}})

db.users.updateOne({username:"jones"},
    {
        $set:{
            favorites:{
                movies:["Casablanca","Rocky"]
            }
        }
    })

// users 컬렉션의 "Casablanaca" 영화를 좋아하는 사용자들을 출력하세요.
db.users.find({"favorites.movies":"Casablanca"}).pretty()

//users 컬렉션의 "Casablanca"영화를 좋아하는 사용자들에 대해서 좋아하는 영화 목록에 "The Maltes Falcon"을 중복 없이 추가
db.users.updateMany({"favorites.movies":"Casablanca"},
    {$addToSet:{"favorites.movies":"The Maltes Falcon"}},
    {upsert:false})

// numbers 컬렉션에 20000개의 문서 생성
for(let i=0;i<200000;i++){
    db.numbers.insertOne({num:i});
}

// numbers 컬렉션의 문서 개수를 출력하세요.
db.numbers.count()

// numbers 컬렉션에서 num의 값이 20이상 25이하인 문서를 출력하세요
db.numbers.find({num:{"$gt":20,"lt":25}})

// 쿼리의 실행 통계를 출력하세요
db.numbers.find({num:{"$gt":199995}}).explain("executionStats")

// numbers 컬렉션의 num 키에 대해서 인덱스 생성
db.numbers.ensureIndex({num:1})

//위에서 생성한 인덱스 정보 출력
db.numbers.getIndexes()

// 앞에서 작성한 범위 연산 쿼리의 실행 통계를 출력하고 인덱스가 없을 때와 비교
db.numbers.find({num:{"$gt":199995}}).explain("executionStats")
