# GitHub Copilot Configuration for Zeroregi Web Server

This directory contains comprehensive GitHub Copilot configuration files to enhance your development experience on the zeroregi-web-server project.

## 📁 Structure

```
.github/
├── copilot-instructions.md          # Main project-wide instructions
├── instructions/                     # Specific instruction files
│   ├── java.instructions.md         # Java coding standards
│   ├── spring.instructions.md       # Spring Framework patterns
│   ├── testing.instructions.md      # Testing guidelines
│   └── security.instructions.md     # Security best practices
└── prompts/                          # Reusable prompt templates
    ├── specification.prompt.md      # Feature specification generation
    ├── planning.prompt.md           # Implementation planning
    ├── write-code.prompt.md         # Code generation
    ├── write-tests.prompt.md        # Test generation
    ├── code-review.prompt.md        # Code review assistance
    ├── refactor-code.prompt.md      # Code refactoring
    ├── generate-docs.prompt.md      # Documentation generation
    └── debug-issue.prompt.md        # Debugging assistance
```

## 🚀 Quick Start

### 1. Enable GitHub Copilot

Make sure GitHub Copilot is installed and enabled in your VS Code:
- Install the GitHub Copilot extension
- Sign in with your GitHub account
- Ensure your subscription is active

### 2. Verify Configuration

The configuration files are automatically detected by GitHub Copilot when they're in the `.github` directory.

### 3. Using Instructions

Instructions in `.github/instructions/` automatically apply based on file types:
- `java.instructions.md` - Applied to all `*.java` files
- `spring.instructions.md` - Applied to Java and XML files
- `testing.instructions.md` - Applied to test files
- `security.instructions.md` - Applied across all code files

### 4. Using Prompts

Use prompts in GitHub Copilot Chat by referencing them with `#file`:

#### Generate Feature Specification
```
@workspace /explain #file:.github/prompts/specification.prompt.md
```
Then provide details about your feature.

#### Plan Implementation
```
@workspace #file:.github/prompts/planning.prompt.md
```
Ask it to create an implementation plan for your feature.

#### Generate Code
```
@workspace #file:.github/prompts/write-code.prompt.md
```
Specify what component you want to build.

#### Write Tests
```
@workspace #file:.github/prompts/write-tests.prompt.md
```
Ask for tests for a specific class.

#### Review Code
```
@workspace #file:.github/prompts/code-review.prompt.md
```
Point it to files you want reviewed.

#### Refactor Code
```
@workspace #file:.github/prompts/refactor-code.prompt.md
```
Specify what code needs refactoring.

#### Generate Documentation
```
@workspace #file:.github/prompts/generate-docs.prompt.md
```
Request documentation for specific components.

#### Debug Issues
```
@workspace #file:.github/prompts/debug-issue.prompt.md
```
Describe the problem you're encountering.

## 💡 Usage Examples

### Example 1: Creating a New Feature

1. **Specification**:
   ```
   @workspace #file:.github/prompts/specification.prompt.md
   Create a specification for a new discount management feature
   ```

2. **Planning**:
   ```
   @workspace #file:.github/prompts/planning.prompt.md
   Create an implementation plan for the discount management feature
   ```

3. **Implementation**:
   ```
   @workspace #file:.github/prompts/write-code.prompt.md
   Generate the DiscountService class with CRUD operations
   ```

4. **Testing**:
   ```
   @workspace #file:.github/prompts/write-tests.prompt.md
   Generate unit tests for DiscountServiceImpl
   ```

### Example 2: Code Review

```
@workspace #file:.github/prompts/code-review.prompt.md
Review the files in com/ht/menu/service/impl/MenuItemServiceImpl.java
```

### Example 3: Debugging

```
@workspace #file:.github/prompts/debug-issue.prompt.md
I'm getting a NullPointerException in MenuItemServiceImpl.calculateTotal() method
```

## 🎯 Best Practices

### When Using Instructions

- Instructions are automatically applied based on file patterns
- They guide Copilot's suggestions as you type
- No need to explicitly reference them in chat

### When Using Prompts

- Start chat with `@workspace` for project context
- Reference prompts using `#file:.github/prompts/[name].prompt.md`
- Provide clear, specific details about what you need
- Follow up with clarifying questions if needed

### Project-Specific Guidelines

1. **Follow Layered Architecture**: Controller → Service → DAO
2. **Use Transactions**: Always use `@Transactional(rollbackFor = Exception.class)`
3. **Parameterized Queries**: Use `#{param}` in MyBatis, never `${param}`
4. **Error Handling**: Catch exceptions and return user-friendly messages
5. **Internationalization**: Use `I18nMsg.getMessage()` for all user messages
6. **Security**: Validate all input, prevent SQL injection, use Shiro properly

## 🔧 Customization

### Modifying Instructions

Edit files in `.github/instructions/` to customize:
- Coding standards
- Framework usage patterns
- Security requirements
- Testing strategies

### Creating New Prompts

Create new `.prompt.md` files in `.github/prompts/` with:

```yaml
---
agent: 'agent'
tools: ['runCommands', 'edit', 'search', 'todos']
description: 'Brief description of the prompt'
---

# Prompt Title

Your prompt instructions here...
```

### File Patterns

Instructions use the `applyTo` frontmatter to target specific files:
- `**/*.java` - All Java files
- `**/*Test.java` - All test files
- `**/*.xml` - All XML files

## 📚 Resources

### Project Documentation
- [Main Copilot Instructions](.github/copilot-instructions.md)
- [Java Guidelines](.github/instructions/java.instructions.md)
- [Spring Framework](.github/instructions/spring.instructions.md)
- [Testing Standards](.github/instructions/testing.instructions.md)
- [Security Practices](.github/instructions/security.instructions.md)

### External Resources
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Spring Framework Docs](https://spring.io/projects/spring-framework)
- [MyBatis Documentation](https://mybatis.org/mybatis-3/)
- [Apache Shiro](https://shiro.apache.org/)

## 🤝 Contributing

To improve these configurations:

1. Test changes with real development scenarios
2. Keep instructions concise and actionable
3. Provide code examples where helpful
4. Update documentation when adding new patterns
5. Share improvements with the team

## ⚠️ Troubleshooting

### Copilot Not Using Instructions

- Verify files are in `.github/` directory
- Check YAML frontmatter syntax
- Ensure file patterns match your files
- Restart VS Code

### Prompts Not Working

- Use full path: `#file:.github/prompts/[name].prompt.md`
- Start with `@workspace` for project context
- Check that the prompt file exists
- Verify YAML frontmatter is valid

### Suggestions Don't Match Standards

- Review and update instruction files
- Be more specific in chat requests
- Reference specific instructions in chat
- Provide examples of desired output

## 📝 Notes

- This configuration is based on the existing zeroregi-web-server codebase
- Instructions adapt from community best practices and awesome-copilot collection
- All generated code should be reviewed before committing
- Test coverage and security should always be verified

## 🔄 Version

**Version**: 1.0  
**Last Updated**: December 2025  
**Compatible With**: GitHub Copilot Chat in VS Code

---

For questions or improvements, contact the development team.
