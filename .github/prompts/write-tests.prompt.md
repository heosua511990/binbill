---
agent: 'agent'
tools: ['runCommands', 'runTasks', 'edit', 'search', 'todos', 'runTests', 'usages', 'problems', 'testFailure', 'fetch']
description: 'Generate comprehensive tests for zeroregi-web-server'
---

# Write Tests

You are an expert in test-driven development for Java Spring applications. Your goal is to write comprehensive, maintainable tests for the zeroregi-web-server project.

## Context

- JUnit for test framework
- Mockito for mocking
- Spring Test for Spring components
- Focus on service layer and DAO layer testing

## Your Task

Generate thorough test suites that cover functionality, edge cases, and error scenarios.

### Test Structure

#### 1. Service Layer Unit Tests

```java
package com.ht.menu.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.ht.menu.dao.MenuItemDao;
import com.ht.menu.entity.MenuItem;
import com.ht.menu.service.impl.MenuItemServiceImpl;

@RunWith(MockitoJUnitRunner.class)
public class MenuItemServiceTest {
    
    @Mock
    private MenuItemDao menuItemDao;
    
    @InjectMocks
    private MenuItemServiceImpl menuItemService;
    
    private MenuItem testMenuItem;
    
    @Before
    public void setUp() {
        testMenuItem = new MenuItem();
        testMenuItem.setId("TEST001");
        testMenuItem.setShopId("SHOP001");
        testMenuItem.setMenuName("Test Item");
        testMenuItem.setPrice(new BigDecimal("10.00"));
    }
    
    @Test
    public void shouldReturnMenuItemsWhenSelectIsCalled() {
        // Arrange
        List<Object> expectedList = new ArrayList<>();
        expectedList.add(testMenuItem);
        when(menuItemDao.select(any(MenuItem.class))).thenReturn(expectedList);
        
        // Act
        List<Object> result = menuItemService.select(testMenuItem);
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(menuItemDao, times(1)).select(any(MenuItem.class));
    }
    
    @Test
    public void shouldInsertMenuItemWhenValidDataProvided() {
        // Arrange
        when(menuItemDao.insert(any(MenuItem.class))).thenReturn(true);
        
        // Act
        boolean result = menuItemService.insert(testMenuItem);
        
        // Assert
        assertTrue(result);
        verify(menuItemDao, times(1)).insert(testMenuItem);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionWhenInsertingNullMenuItem() {
        // Act
        menuItemService.insert(null);
    }
    
    @Test
    public void shouldUpdateMenuItemWhenValidIdProvided() {
        // Arrange
        when(menuItemDao.update(any(MenuItem.class))).thenReturn(true);
        
        // Act
        boolean result = menuItemService.update(testMenuItem);
        
        // Assert
        assertTrue(result);
        verify(menuItemDao, times(1)).update(testMenuItem);
    }
    
    @Test
    public void shouldDeleteMenuItemWhenValidIdProvided() {
        // Arrange
        when(menuItemDao.delete(any(MenuItem.class))).thenReturn(true);
        
        // Act
        boolean result = menuItemService.delete(testMenuItem);
        
        // Assert
        assertTrue(result);
        verify(menuItemDao, times(1)).delete(testMenuItem);
    }
    
    @Test
    public void shouldHandleEmptyResultWhenNoMenuItemsFound() {
        // Arrange
        when(menuItemDao.select(any(MenuItem.class))).thenReturn(new ArrayList<>());
        
        // Act
        List<Object> result = menuItemService.select(testMenuItem);
        
        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}
```

#### 2. DAO Integration Tests

```java
package com.ht.menu.dao;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.ht.menu.entity.MenuItem;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-test.xml"})
@Transactional
public class MenuItemDaoTest {
    
    @Autowired
    private MenuItemDao menuItemDao;
    
    private MenuItem testMenuItem;
    
    @Before
    public void setUp() {
        testMenuItem = new MenuItem();
        testMenuItem.setId("TEST001");
        testMenuItem.setShopId("SHOP001");
        testMenuItem.setMenuName("Test Item");
        testMenuItem.setPrice(new BigDecimal("10.00"));
    }
    
    @Test
    public void shouldInsertMenuItemSuccessfully() {
        // Act
        boolean result = menuItemDao.insert(testMenuItem);
        
        // Assert
        assertTrue(result);
        
        // Verify insertion
        MenuItem search = new MenuItem();
        search.setId("TEST001");
        List<Object> found = menuItemDao.select(search);
        assertFalse(found.isEmpty());
    }
    
    @Test
    public void shouldUpdateMenuItemSuccessfully() {
        // Arrange - insert first
        menuItemDao.insert(testMenuItem);
        
        // Act - update
        testMenuItem.setMenuName("Updated Name");
        boolean result = menuItemDao.update(testMenuItem);
        
        // Assert
        assertTrue(result);
        
        // Verify update
        MenuItem search = new MenuItem();
        search.setId("TEST001");
        List<Object> found = menuItemDao.select(search);
        MenuItem updated = (MenuItem) found.get(0);
        assertEquals("Updated Name", updated.getMenuName());
    }
    
    @Test
    public void shouldDeleteMenuItemSuccessfully() {
        // Arrange - insert first
        menuItemDao.insert(testMenuItem);
        
        // Act
        boolean result = menuItemDao.delete(testMenuItem);
        
        // Assert
        assertTrue(result);
        
        // Verify deletion
        MenuItem search = new MenuItem();
        search.setId("TEST001");
        List<Object> found = menuItemDao.select(search);
        assertTrue(found.isEmpty());
    }
    
    @Test
    public void shouldReturnEmptyListWhenNoMatchFound() {
        // Arrange
        MenuItem search = new MenuItem();
        search.setId("NONEXISTENT");
        
        // Act
        List<Object> result = menuItemDao.select(search);
        
        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}
```

#### 3. Controller Tests

```java
package com.ht.menu.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.ht.menu.entity.MenuItem;
import com.ht.menu.service.MenuItemService;

@RunWith(MockitoJUnitRunner.class)
public class MenuItemControllerTest {
    
    private MockMvc mockMvc;
    
    @Mock
    private MenuItemService menuItemService;
    
    @InjectMocks
    private MenuItemController menuItemController;
    
    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(menuItemController).build();
    }
    
    @Test
    public void shouldReturnMenuItemListWhenListEndpointCalled() throws Exception {
        // Arrange
        List<Object> menuItems = new ArrayList<>();
        menuItems.add(new MenuItem());
        when(menuItemService.select(any(MenuItem.class))).thenReturn(menuItems);
        
        // Act & Assert
        mockMvc.perform(get("/menuItem/list.json"))
               .andExpect(status().isOk());
        
        verify(menuItemService, times(1)).select(any(MenuItem.class));
    }
    
    @Test
    public void shouldReturnSuccessWhenSavingValidMenuItem() throws Exception {
        // Arrange
        when(menuItemService.insert(any(MenuItem.class))).thenReturn(true);
        
        // Act & Assert
        mockMvc.perform(post("/menuItem/save.json")
                .param("menuName", "Test Item")
                .param("price", "10.00"))
               .andExpect(status().isOk());
        
        verify(menuItemService, times(1)).insert(any(MenuItem.class));
    }
}
```

### Test Naming Conventions

- Test class: `[ClassName]Test` or `[ClassName]Tests`
- Test method: `should[ExpectedBehavior]When[StateUnderTest]`
- Use descriptive names that explain the test purpose

### Test Coverage Goals

Generate tests for:
- **Happy path**: Normal, expected behavior
- **Edge cases**: Boundary conditions, empty inputs, null values
- **Error scenarios**: Invalid input, exceptions, failures
- **Business rules**: Validation logic, calculations, workflows
- **Integration points**: Database operations, external services

### What to Test

Ask the user:
1. What class or component needs tests?
2. Are there specific scenarios to focus on?
3. Should we test integration with database?
4. Are there external dependencies to mock?

### Test Quality Checklist

- [ ] Tests are independent and can run in any order
- [ ] Each test has clear Arrange-Act-Assert sections
- [ ] Mocks are used for dependencies
- [ ] Test data is realistic but minimal
- [ ] Edge cases are covered
- [ ] Error scenarios are tested
- [ ] Assertions are specific and meaningful
- [ ] Tests are maintainable and readable
- [ ] Test names are descriptive
- [ ] Setup and teardown are properly handled

## Output Format

Provide:
1. Complete test class with imports
2. Test setup and teardown methods
3. Multiple test methods covering different scenarios
4. Mock configurations
5. Assertion examples
6. Comments explaining complex test logic

## Best Practices

- Write tests that document behavior
- Keep tests simple and focused
- Use meaningful test data
- Don't test framework code
- Test one thing per test method
- Use proper mocking strategies
- Verify interactions when needed
- Test transactions rollback properly
- Consider performance of tests
- Make tests maintainable
