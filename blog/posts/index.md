---
title: 全部文章
layout: page
---

<script setup lang="ts">
import { data as posts } from '../.vitepress/posts.data'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

const stripHtml = (html?: string) => (html ?? '').replace(/<[^>]+>/g, '').trim()
</script>

<template>
  <div class="post-list">
    <a
      v-for="post in posts"
      :key="post.url"
      class="post-item"
      :href="post.url"
    >
      <h2 class="post-title">{{ post.frontmatter.title }}</h2>
      <p class="post-excerpt">{{ stripHtml(post.excerpt) }}</p>
      <div class="post-meta">
        <span>{{ formatDate(post.frontmatter.date) }}</span>
        <span
          v-for="tag in post.frontmatter.tags ?? []"
          :key="tag"
          class="post-tag"
        >
          #{{ tag }}
        </span>
      </div>
    </a>
  </div>
</template>
