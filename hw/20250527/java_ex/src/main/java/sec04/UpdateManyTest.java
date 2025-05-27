package sec04;

import app.Database;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.conversions.Bson;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.gt;
public class UpdateManyTest {
    public static void main(String[] args) {
        MongoCollection<Document> collection = Database.getCollection("users");
//        int age = 16;
//        Bson query = gt("age", age);
        //done 필드 값이 false인 문서 찾기 조건
        Bson query = eq("done",false);
        Bson updates = Updates.combine(

                Updates.set("done", true),
                Updates.currentTimestamp("lastUpdated"));

        //done 필드 값이 false인 모든 문서를 true로 변경
        UpdateResult result = collection.updateMany(query, updates);
        System.out.println("==> UpdateManyResult : " + result.getModifiedCount());
        Database.close();
    }
}
