package app;

import app.domain.Todo;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;

public class App2 {
    public static void main(String[] args) {
        // Todo 타입 컬렉션 얻어오기
        MongoCollection<Todo> collection = Database.getCollection("todo",Todo.class);

        // 1개 삽입
        //insertTodo(collection,"수업 시간에 집중하기","딴 짓 그만");

        // 여러 개 삽입
        insertManyTodo(collection,"샘플",5);

        // 모든 요소 조회 후 출력
        selectAllTodo(collection);

        // _id 일치하는 Todo 1개 조회
        selectTodo(collection,"68353e00222cd5061d3ac7a2");

        //_id 일치하는 Todo의 done 수정
        updateTodo(collection,"68353e00222cd5061d3ac7a2",true);

        // 모든 항목 업데이트
        updateAllTodo(collection,true);

        // _id가 일치하는 Todo 삭제
        deleteTodo(collection,"68353e00222cd5061d3ac7a2");

        // 모든 항목 삭제
        deleteAllTodo(collection);

        Database.close();
    }
    private static void insertTodo(MongoCollection<Todo> collection, String title, String desc){
        // Todo 객체 생성
        Todo todo = new Todo(null, title, desc, false);
        //insert 후 결과 객체 반환 받기
        InsertOneResult result = collection.insertOne(todo);

        System.out.println("todo 추가 성공 ==> _id: "+ result.getInsertedId());
    }
    private static void insertManyTodo(MongoCollection<Todo> collection, String str, int count){
        //str을 제목, 설명으로 갖는 샘플 Todo 문서 count 만큼 삽입하기
        List<Todo> todoList = new ArrayList<>();
        for(int i=0;i<count;i++){
            Todo todo = new Todo(null, str+i, str + i + "설명", false);
            todoList.add(todo);
        }
        InsertManyResult result = collection.insertMany(todoList);
        System.out.println("샘플 데이터 추가 성공 : "+ result.getInsertedIds());
    }
    //모든 Todo 조회
    private static void selectAllTodo(MongoCollection<Todo> collection){
        List<Todo> todoList = new ArrayList<>();//빈 리스트 생성
        collection.find().into(todoList);

        todoList.forEach(System.out::println);
    }

    // _id 일치하는 todo 1개 조회
    private static void selectTodo(MongoCollection<Todo> collection, String id){
        //쿼리 셀렉터(조건) 생성
        Bson query = eq("_id", new ObjectId(id));

        //조회된 문서 1개를 자동으로 Todo 로 변환하여 저장
        Todo todo = collection.find(query).first();

        if(todo==null){
            System.out.println("_id가 일치하는 문서가 없습니다.");
            return;
        }
        System.out.println("_id :" + todo.getId());
        System.out.println("title :" + todo.getTitle());
        System.out.println("desc :" + todo.getDesc());
        System.out.println("done :" + todo.isDone());
    }
    //id가 일치하는 Todo 문서의 done 값 수정
    private static void updateTodo(MongoCollection<Todo> collection, String id, boolean done){
        //쿼리 셀레터 (조건) 생성
        Bson query = eq("_id", new ObjectId(id));
        // 업데이트할 내용(set, unset 등)
        Bson update = Updates.set("done",done);
        // 실행 후 결과 객체(updateOne(), UpdateResult)
        // -> 수정된 문서의 개수 얻을 수 있음
        UpdateResult result = collection.updateOne(query, update);

        // 개수 == 0
        // 실패 메시지 출력
        if(result.getModifiedCount()==0){
            System.out.println("일치하는 _id를 가지는 문서가 없거나 수정 사항 없음");
        }
        // 개수 > 0
        // 성공 메시지 출력 + selectTodo(collectoin,id) 호출

        System.out.println("===수정 성공===");
        selectTodo(collection, id);
    }

    private static void updateAllTodo(MongoCollection<Todo> collection, boolean done){
        Bson query = empty();//빈 조건(쿼리셀렉터) {} 생성
        Bson update = Updates.set("done",done);

        UpdateResult result = collection.updateMany(query, update);
        if(result.getModifiedCount()==0){
            System.out.println("변경 사항 없음");
            return;
        }
        System.out.println("===수정 성공===");
        selectAllTodo(collection);
    }

    private static void deleteTodo(MongoCollection<Todo> collection, String id){
        Bson query = eq("_id", new ObjectId(id));
        DeleteResult result = collection.deleteOne(query);

        if(result.getDeletedCount()==0){
            System.out.println("일치하는 _id 없음");
            return;
        }
        System.out.println("===삭세 성공===");
    }
    private static void deleteAllTodo(MongoCollection<Todo> collection){
        Bson query = empty();
        DeleteResult result = collection.deleteMany(query);

        System.out.println("삭제된 문서의 개수: "+ result.getDeletedCount());
    }
}
