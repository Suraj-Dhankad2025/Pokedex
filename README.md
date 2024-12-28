A web application to explore Pokemon, built using Next.js, ShadCN, and PokeAPI. The app includes features like pagination, the ability to add Pokémon to a favorites list stored in local storage, and filtering capabilities.

## Getting Started
Prerequisites
	• Node.js (v16 or later) <br>
	• npm or yarn <br>
 
First, clone the Repository and open it locally 
 ```bash
git clone https://github.com/Suraj-Dhankad2025/Pokedex.git
cd Pokedex
```
Install all dependencies
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 🚀 Features
1.Dynamic Pagination: Efficiently loads and displays Pokémon data across multiple pages without overwhelming the API or client browser.<br>
2.Favorites Management: Allows users to mark and unmark Pokémon as favorites, saved directly to local storage for persistence across sessions.<br>
3.Filtering: Users can filter Pokemon based on their favorite status or Type of Pokemon.<br>

## Challenges and Solutions
1. Pagination Handling: <br>
	• Challenge: Managing dynamic data loading without degrading performance or user experience.<br>
	• Solution: Implemented server-side data fetching with getServerSideProps in Next.js to load paginated data efficiently and maintain scalability.<br>
2. Local Storage Favorites:<br>
	• Challenge: Managing favorites in local storage while maintaining React’s state synchronization.<br>
	• Solution: Utilized the useState and useEffect hooks to synchronize local storage with React state.<br>
3. Filtering with Pagination:<br>
	• Challenge: Ensuring the filtering feature didn’t conflict with the pagination system.<br>
	• Solution:<br>
	      Applied client-side filtering on the already fetched paginated data using React state.<br>
	      Maintained a seamless user experience by re-rendering the filtered list dynamically.<br>
   
## Future Enhancements
  Add advanced filtering options (e.g., by type, ability, or region).<br>
  Implement a search bar for quick Pokemon lookup.<br>
  Adding Authentication(OAuth or JWT Auth).<br>
  Enable dark mode for better accessibility.<br>

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Deploy on Vercel
Deployed Link - https://pokedex-eta-six-55.vercel.app/ <br>
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

