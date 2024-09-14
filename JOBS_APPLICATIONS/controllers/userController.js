import JobModel from "../models/jobModel.js";

export async function getJobs(req, res) {
  try {
    const data = await JobModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching jobs', details: error.message });
  }
}

export async function addJob(req, res) {
  try {
    const newJob = new JobModel(req.body);
    const result = await newJob.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: 'Error adding job', details: error.message });
  }
}

export async function editJob(req, res) {
  const id = req.params.id;
  try {
    const result = await JobModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: 'Error updating job', details: error.message });
  }
}

export async function deleteJob(req, res) {
  const id = req.params.id;
  try {
    const result = await JobModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting job', details: error.message });
  }
}
