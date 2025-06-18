<script setup lang="ts">
defineProps<{
	author: string;
	linkedIn: string;
}>();
</script>
<template>
	<footer class="footer">
		<p>
			Développé par
			<a :href="linkedIn" target="_blank" rel="noopener noreferrer">
				{{ author }}
			</a>
			© {{ new Date().getFullYear() }}
		</p>
	</footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
	margin-top: 2rem;
	padding: 1rem;
	text-align: center;
	color: #ccc;
	border-top: 1px solid #333;
}

.footer a {
	color: #0e76a8;
	text-decoration: none;
	font-weight: 500;
}

.footer a:hover {
	text-decoration: underline;
}
</style>
