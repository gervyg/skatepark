describe("pruebaskatepark", () => {
    it("frontpage can be opened", () => {
        cy.visit("http://localhost:5000");
        cy.contains("Lista de participantes");
    });

    it("Click btn Ingresar", () => {
        cy.visit("http://localhost:5000/login");
        cy.contains("Ingresar").click();
    });

    it("Click test Input", () => {
        cy.visit("http://localhost:5000/login");
        cy.get("input:first").type("mi_nombre_Prueba_Cypress");
    });
});

