const pipelineGenerator = (config) => {
  const stages = config.stages || [];
  const pipeline = {
    stages: []
  };

  stages.forEach((stage) => {
    const { name, tasks } = stage;
    pipeline.stages.push({
      name,
      tasks: tasks.map((task) => {
        switch (task.type) {
          case 'build':
            return {
              type: 'build',
              script: task.script
            };
          case 'deploy':
            return {
              type: 'deploy',
              environment: task.environment
            };
          default:
            throw new Error(`Unknown task type: ${task.type}`);
        }
      })
    });
  });

  return pipeline;
};

const config = {
  stages: [
    {
      name: 'build',
      tasks: [
        {
          type: 'build',
          script: 'npm run build'
        }
      ]
    },
    {
      name: 'deploy-dev',
      tasks: [
        {
          type: 'deploy',
          environment: 'dev'
        }
      ]
    },
    {
      name: 'deploy-prod',
      tasks: [
        {
          type: 'deploy',
          environment: 'prod'
        }
      ]
    }
  ]
};

const pipeline = pipelineGenerator(config);
console.log(pipeline);