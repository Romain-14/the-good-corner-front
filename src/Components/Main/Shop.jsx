import React from "react";

function Shop({ products }) {
    
    return (
        <main id="shop">
            <section>
				<h2>Our Products</h2>
                {products.map((product) => {
                    return (
                        <article key={product.id}>
                            <h3>{product.title}</h3>
                        </article>
                    );
                })}
            </section>
        </main>
    );
}

export default Shop;
