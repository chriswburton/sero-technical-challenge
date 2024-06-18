describe("Recipe tests", () => {
    it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
        cy.visit('http://localhost:3000');

        // empty form should be disabled
        cy.get('[data-testid=createRecipeSubmit]').should('be.disabled');

        // add name
        cy.get('[data-testid=createRecipeName]').type('My first recipe');

        // incomplete form should be disabled
        cy.get('[data-testid=createRecipeSubmit]').should('be.disabled');

        // add ingredients + measurements
        cy.get('[data-testid=addMeasurement]').click();
        cy.get('[data-testid=createRecipeIngredient0]').select('Broccoli');
        cy.get('[data-testid=createRecipeQuantity0]').type('2');
        cy.get('[data-testid=createRecipeUnit0]').type('florets');

        cy.get('[data-testid=addMeasurement]').click();
        cy.get('[data-testid=createRecipeIngredient1]').select('Rice');
        cy.get('[data-testid=createRecipeQuantity1]').type('400');
        cy.get('[data-testid=createRecipeUnit1]').type('grams');

        // incomplete form should be disabled
        cy.get('[data-testid=createRecipeSubmit]').should('be.disabled');

        // add cooking method
        cy.get('[data-testid=createRecipeCookingMethod]').type('boil rice + boil brocolli');

        // complete form should now be enabled
        cy.get('[data-testid=createRecipeSubmit]').should('not.be.disabled');

        // recipe is saved into the db when submitted
        cy.intercept({ method: 'POST',  url: '/recipes' }).as('createRecipe');
        cy.get('[data-testid=createRecipeSubmit]').click();
        cy.wait('@createRecipe').then((interception) => {
            const { name, ingredients, measurements, cookingMethod } = interception.response.body;
            expect(name).to.eq('My first recipe');
            expect(cookingMethod).to.eq('boil rice + boil brocolli');

            // Note: had some issues getting Jest to be used over Chai, didn't want to waste time
            expect(JSON.stringify(ingredients)).to.eq(JSON.stringify(['66711db434c28262b40aae32', '66711db434c28262b40aae40']));
            expect(JSON.stringify(measurements)).to.eq(JSON.stringify([
                { ingredientId: '66711db434c28262b40aae32', quantity: 2, unit: 'florets' },
                { ingredientId: '66711db434c28262b40aae40', quantity: 400, unit: 'grams' }
            ]));

        })
    });

    it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=recipeSearch]').type('I am a test');
        cy.get('[data-testid=recipeSearchSubmit]').click();

        cy.wait(1000);

        // ensure our default test recipe is displayed
        cy.get('[data-testid=recipeResult0Name]').should("have.text", 'I am a test recipe');
        cy.get('[data-testid=recipeResult0Ingredient0]').should("have.text", 'Broccoli');
        cy.get('[data-testid=recipeResult0Ingredient1]').should("have.text", 'Rice');
        cy.get('[data-testid=recipeResult0Method]').should("have.text", `Method: Test cooking method`);
    });

    it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=recipeSearchIngredients]').select('Rice');
        cy.get('[data-testid=recipeSearchIngredientsSubmit]').click();

        cy.wait(1000);

        // ensure our default test recipe is displayed
        cy.get('[data-testid=recipeResult0Name]').should("have.text", 'I am a test recipe');
        cy.get('[data-testid=recipeResult0Ingredient0]').should("have.text", 'Broccoli');
        cy.get('[data-testid=recipeResult0Ingredient1]').should("have.text", 'Rice');
        cy.get('[data-testid=recipeResult0Method]').should("have.text", `Method: Test cooking method`);
    });
});
