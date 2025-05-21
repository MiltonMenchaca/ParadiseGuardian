import { List, ListItem, ListItemText, Chip, IconButton, Collapse, Tooltip } from '@mui/material';
import { SecurityLog } from '../types';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiInfo, FiAlertCircle, FiChevronDown, FiChevronUp, FiMap, FiMonitor, FiGlobe } from 'react-icons/fi';
import { useState } from 'react';

interface LogsListProps {
  logs: SecurityLog[];
}

const LogsList = ({ logs }: LogsListProps) => {
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

  // Function to toggle expanded state for a log
  const toggleExpand = (logId: string | number) => {
    setExpandedLogs(prev => ({
      ...prev,
      [logId.toString()]: !prev[logId.toString()]
    }));
  };

  // Function to determine chip color based on level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'error';
      case 'error':
      case 'high':
        return 'error';
      case 'warning':
      case 'medium':
        return 'warning';
      case 'info':
      case 'low':
      default:
        return 'info';
    }
  };

  // Function to get level regardless of log structure
  const getLevel = (log: SecurityLog): string => {
    // If level exists, use it, otherwise use severity if it exists
    return log.level || log.severity || 'unknown';
  };

  // Function to get the appropriate icon based on level
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'error':
      case 'high':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
      case 'medium':
        return <FiAlertTriangle className="text-amber-500" />;
      case 'info':
      case 'low':
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };

  // Animation for the logs list
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-auto max-h-[60vh]"
    >
      <List>
        {logs.length === 0 ? (
          <ListItem>
            <ListItemText primary="No logs available" className="text-gray-500" />
          </ListItem>
        ) : (
          logs.map((log) => (
            <motion.div key={log.id} variants={item} className="mb-2">
              <ListItem 
                alignItems="flex-start" 
                className="rounded-lg hover:bg-gray-50 transition-colors duration-200 p-3 border border-gray-100"
              >
                <ListItemText
                  primary={
                    <span className="flex items-center gap-2 mb-1">
                      <span className="mr-1">
                        {getLevelIcon(getLevel(log))}
                      </span>
                      <Chip 
                        label={getLevel(log).toUpperCase()} 
                        color={getLevelColor(getLevel(log)) as "error" | "warning" | "info" | "default" | "primary" | "secondary" | "success"}
                        size="small"
                        className="font-semibold"
                      />
                      <span className="font-medium text-gray-800">{log.message}</span>
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(log.id)}
                        className="ml-auto"
                      >
                        {expandedLogs[log.id.toString()] ? <FiChevronUp /> : <FiChevronDown />}
                      </IconButton>
                    </span>
                  }
                  secondary={
                    <>
                      <span className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
                        <span className="flex items-center">
                          <span className="font-medium mr-1">Source:</span> {log.source}
                        </span>
                        <span className="flex items-center">
                          <span className="font-medium mr-1">Timestamp:</span>
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </span>
                      
                      <Collapse in={expandedLogs[log.id.toString()]} timeout="auto" unmountOnExit>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {/* Location information */}
                            {(log.location || log.country) && (
                              <div className="flex items-start">
                                <Tooltip title="Location">
                                  <span className="inline-flex mr-2 text-blue-500">
                                    <FiMap />
                                  </span>
                                </Tooltip>
                                <span>
                                  <span className="font-medium block">Location</span>
                                  {log.location && <span className="block">{log.location}</span>}
                                  {log.country && <span className="block">Country: {log.country}</span>}
                                  {log.ipAddress && <span className="block text-gray-500">IP: {log.ipAddress}</span>}
                                </span>
                              </div>
                            )}
                            
                            {/* Device information */}
                            {(log.device || log.browser || log.os) && (
                              <div className="flex items-start">
                                <Tooltip title="Device">
                                  <span className="inline-flex mr-2 text-green-500">
                                    <FiMonitor />
                                  </span>
                                </Tooltip>
                                <span>
                                  <span className="font-medium block">Device Info</span>
                                  {log.device && <span className="block">Device: {log.device}</span>}
                                  {log.os && <span className="block">OS: {log.os}</span>}
                                  {log.browser && <span className="block">Browser: {log.browser}</span>}
                                </span>
                              </div>
                            )}
                            
                            {/* Correlation ID */}
                            {log.correlationId && (
                              <div className="flex items-start">
                                <Tooltip title="Correlation ID">
                                  <span className="inline-flex mr-2 text-purple-500">
                                    <FiGlobe />
                                  </span>
                                </Tooltip>
                                <span>
                                  <span className="font-medium block">Correlation ID</span>
                                  <span className="block text-xs break-all">{log.correlationId}</span>
                                </span>
                              </div>
                            )}
                            
                            {/* Additional Data */}
                            {log.additionalData && (
                              <div className="flex items-start col-span-full">
                                <span className="font-medium mr-2">Additional Data:</span>
                                <pre className="text-xs bg-gray-50 p-2 rounded w-full overflow-auto">
                                  {JSON.stringify(log.additionalData, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </Collapse>
                    </>
                  }
                />
              </ListItem>
            </motion.div>
          ))
        )}
      </List>
    </motion.div>
  );
};

export default LogsList;