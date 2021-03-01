import mongoose from "mongoose";

const dbConnect = async () => {
  // 데이터베이스에 연결되어 있다면 함수 종료
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default dbConnect;
