module.exports = function timestamp(schema) {
    // Add the two fields to the schema
    schema.add({
        dateCreated: Date,
        lastUpdated: Date
    });

    // Create a pre-save hook
    schema.pre('save', function (next) {
        let now = Date.now()

        this.lastUpdated = now
        // Set a value for dateCreated only if it is null
        if (!this.dateCreated) {
            this.dateCreated = now
        }
        // Call the next function in the pre-save chain
        next();
    })
}