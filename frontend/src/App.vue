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
	animation: SLIDE_LEFT_FADE_IN 1.5s ease-out forwards;
}

main,
Footer {
	animation: FADE_IN 1s ease-in forwards;
	animation-delay: 1.5s;
	opacity: 0;
	margin-top: 2rem;
}

@keyframes FADE_IN {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes SLIDE_LEFT_FADE_IN {
	from {
		transform: translateX(-200px);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}

@media (min-width: 1200px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
		margin-top: 0;
	}
	main {
		margin-top: 0;
	}
}
</style>
