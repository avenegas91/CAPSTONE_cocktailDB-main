const { pool } = require('../config');

class User {
    static async create(username, hashedPassword, birthdate) {
        try {
            const result = await pool.query(
                'INSERT INTO users (username, password, birthdate) VALUES ($1, $2, $3) RETURNING id',
                [username, hashedPassword, birthdate]
            );
            return result.rows[0].id;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findByUsername(username) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }

    static async findById(userId) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE id = $1',
                [userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    static async update(userId, username, hashedPassword, birthdate) {
        try {
            const result = await pool.query(
                'UPDATE users SET username = $1, password = $2, birthdate = $3 WHERE id = $4 RETURNING *',
                [username, hashedPassword, birthdate, userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async delete(userId) {
        try {
            await pool.query(
                'DELETE FROM users WHERE id = $1',
                [userId]
            );
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

module.exports = User;
