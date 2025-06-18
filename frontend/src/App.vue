<script setup lang="ts">
import Header from "./components/Header.vue";
import TaskList from "./components/TaskList.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
	<header>
		<Header
			title="TO-DO App"
			description="Test technique : Développer une application web de gestion de tâches
					(to-do list)"
		/>
	</header>
	<main>
		<TaskList />
	</main>
	<Footer
		author="Ulysse Dupont"
		linked-in="https://www.linkedin.com/in/ulysse-dupont/"
	/>
</template>

<style scoped>
header {
	line-height: 1.5;
	margin-top: 2rem;
}

@media (min-width: 1200px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
		margin-top: 0;
	}
}
</style>
