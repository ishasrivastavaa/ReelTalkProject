const { admin } = require("./../config/firebase");
const db = admin.firestore();

exports.saveLikes = async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    const userId = req.authUser;

    if (!postId && !commentId) {
      return res.status(400).send("postId or commentId is required");
    }

    const collectionRef = db.collection("likes");

    const docRef = await collectionRef.add({
      userId: userId,
      postId: postId || null,
      commentId: commentId || null,
      createdAt: new Date(),
    });
    console.log(`Document added with ID: ${docRef.id}`);
    res.status(200).send(`Document added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error saving data: ", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserLikes = async (req, res) => {
  try {
    const userId = req.authUser;
    const collectionRef = db.collection("likes");
    const response = await collectionRef.where("userId", "==", userId).get();

    if (response.empty) {
      return res.status(404).send("No matching documents.");
    }

    let documents = [];
    response.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res.status(500).send("Internal Server Error");
  }
};
