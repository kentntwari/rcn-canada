import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './structure'

export default defineConfig([
  {
    name: 'development-workspace',
    title: 'development-workspace',
    projectId: 'umkengib',
    dataset: 'development',
    basePath: '/development',
    plugins: [
      structureTool({
        structure: myStructure,
      }),
      visionTool(),
    ],

    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'production-workspace',
    title: 'production-workspace',
    projectId: 'umkengib',
    dataset: 'production',
    basePath: '/production',
    plugins: [
      structureTool({
        structure: myStructure,
      }),
      visionTool(),
    ],

    schema: {
      types: schemaTypes,
    },
  },
])
