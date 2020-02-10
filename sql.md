# SQL을 배워보자
## 1. 테이블 생성
### 가. 테이블 생성시 컬럼의 속성 정리
1. 정수: tinyInt(255), smallInt(65536), mediumInt(1600만), Int(42억), bigInt(매우큼)
2. 실수: float, double
3. 문자열: char, varchar (65535)
4. 문장: tinyText, mediumText, text(65535), longText(42억)
5. 날짜/시간: datetime, timestamp
6. enum: 정해진 값 중 하나만 쓸때

## 2. 데이터 처리하기
### 가. 데이터 처리는 생성(Create), 조회(read), 수정(Update), 삭제(Delete)의 4가지 처리가 존재하며, 줄여서 CRUD라고 한다.

### 나. CRUD의 SQL 문법
1. 생성/Create/INSERT
~~~sql
INSERT INTO board (title, comment, writer, wdate, img, rnum) VALUES ('제목입니다.', '내용입니다.', '작성자', '2020-02-07 10:47:25', '', 0);
INSERT INTO board SET 
title = '제목입니다.2',
comment = '내용입니다.2',
writer = '작성자2',
wdate = '2020-02-07 10:54:00',
img = '',
rnum = 0
~~~
2. 조회/Read/SELECT
~~~sql
SELECT * FROM board ORDER BY id DESC;
~~~
3. 수정/Update/UPDATE
4. 삭제/Delete/DELETE
~~~sql
DELETE FROM board WHERE id=4;
~~~