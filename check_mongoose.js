
import mongoose from 'mongoose';
console.log('Keys in mongoose:', Object.keys(mongoose));
try {
    const { FilterQuery } = mongoose;
    console.log('FilterQuery:', FilterQuery);
} catch (e) {
    console.log('Error accessing FilterQuery:', e);
}
