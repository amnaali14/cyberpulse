import bcrypt from "bcryptjs";

const storedHashedPassword = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8Jj6xUeXzGtG6z2xgI7T0nR9TzyoJK"; // Your stored hash
const inputPassword = "1234567"; // Replace with what you are testing

async function testPassword() {
  const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);

  if (isMatch) {
    console.log("✅ Password is correct!");
  } else {
    console.log("❌ Incorrect password!");
  }
}

testPassword();
