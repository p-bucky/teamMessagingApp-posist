import Post from "./Post.js";

const AllPosts = ({ posts }) => {
  return (
    <div>
      <ul className="list-group " style={{ width: "300px", marginTop: "10px" }}>
        {posts ? (
          posts.map((post, i) => <Post key={i} post={post} />)
        ) : (
          <h1>Loading</h1>
        )}
      </ul>
    </div>
  );
};

export default AllPosts;
