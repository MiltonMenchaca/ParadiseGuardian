import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import User from "./models/User.js";

dotenv.config();

async function createTestUser() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Database connection established.");
    
    // Synchronize the model (create the table if it doesn't exist)
    await User.sync();
    
    // Test user data
    const testEmail = "admin@test.com";
    const testPassword = "admin123";
    
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email: testEmail } });
    
    if (existingUser) {
      console.log(`User ${testEmail} already exists.`);
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      
      // Create the user
      const newUser = await User.create({
        email: testEmail,
        password: hashedPassword
      });
      
      console.log(`User created successfully: ${testEmail}`);
      console.log(`Credentials: ${testEmail} / ${testPassword}`);
    }
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

// Execute the function
createTestUser(); 