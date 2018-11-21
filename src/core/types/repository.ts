export const RepositoryType = {
    IGenericRepository: Symbol.for('GenericRepository'),
    IAuthorRepository: Symbol.for('AuthorRepository'),
    ICategoryRepository: Symbol.for('CategoryRepository'),
    IBookRepository: Symbol.for('BookRepository')
};