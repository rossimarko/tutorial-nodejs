/**
 * Module 2 Example 1: Callbacks to Promises
 * Demonstrates: Converting callback-based code to promises and async/await
 */

console.log('=== Callbacks to Promises ===\n');

// Simulated async operations (using callbacks)
function fetchUserCallback(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error('Invalid user ID'), null);
    } else {
      callback(null, { id, name: `User ${id}`, email: `user${id}@example.com` });
    }
  }, 100);
}

function fetchPostsCallback(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, title: 'Post 1', userId },
      { id: 2, title: 'Post 2', userId }
    ]);
  }, 100);
}

// 1. OLD WAY: Callback Hell
console.log('1. Callback Hell (Pyramid of Doom):');
fetchUserCallback(1, (err, user) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('User:', user.name);

  fetchPostsCallback(user.id, (err, posts) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('Posts:', posts.length);
    console.log('Done with callbacks!\n');
  });
});

// 2. BETTER: Convert to Promises
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    fetchUserCallback(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

function fetchPostsPromise(userId) {
  return new Promise((resolve, reject) => {
    fetchPostsCallback(userId, (err, posts) => {
      if (err) {
        reject(err);
      } else {
        resolve(posts);
      }
    });
  });
}

// Using promises with .then()
setTimeout(() => {
  console.log('2. Using Promises (.then chain):');
  fetchUserPromise(2)
    .then(user => {
      console.log('User:', user.name);
      return fetchPostsPromise(user.id);
    })
    .then(posts => {
      console.log('Posts:', posts.length);
      console.log('Done with promises!\n');
    })
    .catch(err => {
      console.error('Error:', err);
    });
}, 300);

// 3. BEST: Using async/await
async function getUserWithPosts(userId) {
  try {
    const user = await fetchUserPromise(userId);
    console.log('User:', user.name);

    const posts = await fetchPostsPromise(user.id);
    console.log('Posts:', posts.length);
    console.log('Done with async/await!\n');
  } catch (err) {
    console.error('Error:', err);
  }
}

setTimeout(() => {
  console.log('3. Using Async/Await:');
  getUserWithPosts(3);
}, 600);

// 4. Built-in promisify utility
import { promisify } from 'util';

// Instead of manually wrapping, use promisify
const fetchUserAsync = promisify(fetchUserCallback);
const fetchPostsAsync = promisify(fetchPostsCallback);

setTimeout(async () => {
  console.log('4. Using util.promisify:');
  try {
    const user = await fetchUserAsync(4);
    console.log('User:', user.name);

    const posts = await fetchPostsAsync(user.id);
    console.log('Posts:', posts.length);
    console.log('Done with promisify!');
  } catch (err) {
    console.error('Error:', err);
  }
}, 900);
